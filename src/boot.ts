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
  generateError,
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
    console.error("Something went wrong");
    presendedData = "INTERNAL SERVER ERROR. Try again Later;"
  } finally {
    res.send(presendedData)
  }
})

// boot("::ffff:2.17.124.0");// for debugging
async function boot(ip: string, userAgent): Promise < finalResult > {
  const isInTerm: boolean = isCommandline(userAgent);
  let country: string = await apiCountryFromIp(ip);
  let resFromApi: any = await apiCovidPromise(country)
  let countryVirusStats: binder.Country = new binder.Country(resFromApi.data)

  if (isInTerm) { // curl or wget
    let stats: presentInTerm.Stats = new presentInTerm.Stats(countryVirusStats);
    return stats.getFormatedData();
  } else { // browser
    return countryVirusStats;
  }
}