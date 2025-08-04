import express from "express";
import requestIp from "request-ip"
import dotenv from 'dotenv';
import {presentInTerm} from "./presenter"
import {countryFromIpPromise, countryStatisticsPromise} from './externalApi'
import {dto} from './dto'
import {getCurrentDate, isCommandline} from './utils'
import {CountryDailyStatistics, FinalResult} from "./types";

dotenv.config({path: './.env'})

const app = express();
app.use(requestIp.mw())

const port: number = +process.env.SERVER_PORT || 8080;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

app.get('*', async (req, res) => {
  let presendedData: FinalResult;
  try {
    // Geolocating Visitor
    const userAgent = req.headers['user-agent'];
    const ip = req.clientIp;
    presendedData = await boot(ip, userAgent);
  } catch (err) {
    console.error("Something went wrong" + err.toString());
    presendedData = "500 INTERNAL SERVER ERROR. Please Try again Later.\n"
  } finally {
    res.send(presendedData)
  }
})

async function boot(ip: string, userAgent: string): Promise<FinalResult> {
  const isInTerm: boolean = isCommandline(userAgent);
  const countryName: string = await countryFromIpPromise(ip);
  const today = getCurrentDate();
  const countryDailyCases: CountryDailyStatistics = await countryStatisticsPromise(countryName, today, 'cases');
  const countryDailyDeaths: CountryDailyStatistics = await countryStatisticsPromise(countryName, today, 'deaths');
  const virusStatsForGivenCountryEndDate: dto.VirusStatsForGivenCountryEndDate = new dto.VirusStatsForGivenCountryEndDate(countryDailyCases, countryDailyDeaths)

  if (isInTerm) { // curl or wget
    const stats: presentInTerm.Stats = new presentInTerm.Stats(virusStatsForGivenCountryEndDate, countryName, today);
    return stats.getFormatedData();
  } else { // browser
    return virusStatsForGivenCountryEndDate.toJson();
  }
}