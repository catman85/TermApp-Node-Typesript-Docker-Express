import express from "express";
import requestIp from "request-ip"
import {
  presentInTerm
} from "./presenter"
import {
  apiCountryFromIp,
  apiCovidPromise
} from './externalApi'
import {
  binder
} from './binder'
import {
  isCommandline
} from './utils'


const app = express();
app.use(requestIp.mw())

const port: number = +process.env.SERVER_PORT || 8080;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

type finalResult = string | binder.Country;

app.get('*', async (req, res) => {
  let presendedData: finalResult;
  try {
    // Ipv6 Italy example ::ffff:2.17.124.0 
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

// boot("::ffff:2.17.124.0");// for debugging
async function boot(ip: string, userAgent): Promise<finalResult> {
  const isInTerm: boolean = isCommandline(userAgent);
  const country: string = await apiCountryFromIp(ip);
  const covidApiResponse: any = await apiCovidPromise(country)
  let countryVirusStats: binder.Country = new binder.Country(covidApiResponse.data)

  if (isInTerm) { // curl or wget
    let stats: presentInTerm.Stats = new presentInTerm.Stats(countryVirusStats);
    return stats.getFormatedData();
  } else { // browser
    return countryVirusStats;
  }
}