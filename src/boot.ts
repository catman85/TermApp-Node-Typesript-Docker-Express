import express, {Request, Response} from "express";
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

app.get('*', async (req: Request, res: Response) => {
  let presentedData: FinalResult;
  try {

    presentedData = await boot(req);
  } catch (err) {
    console.error("Something went wrong" + err.toString());
    presentedData = "500 INTERNAL SERVER ERROR. Please Try again Later.\n"
  } finally {
    res.send(presentedData)
  }
})

async function boot(request: Request): Promise<FinalResult> {
  // Geolocating Visitor
  const userAgent = request.headers['user-agent'];
  const ip = request.clientIp;
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