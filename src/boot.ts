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
  generateError
} from './utils'

const app = express();
app.use(requestIp.mw())

const port: number = +process.env.SERVER_PORT || 8080;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

app.get('/', async (req, res) => {
  let presendedData: string;
  try {
    // Ipv6 Italy example ::ffff:2.17.124.0 
    // Geolocating Visitor
    let ip = req.clientIp;
    presendedData = (await boot(ip)).toString();
  } catch (err) {
    console.error("Something went wrong");
    presendedData = "INTERNAL SERVER ERROR. Try again Later;"
  } finally {
    res.send(presendedData)
  }
})

// boot("::ffff:2.17.124.0");// for debugging
async function boot(ip: string): Promise < string > {
  let country = await apiCountryFromIp(ip);
  let countryVirusStats = await bindDataCountry(country);
  let stats: presentInTerm.Stats = new presentInTerm.Stats(countryVirusStats);
  return stats.getFormatedData();
}

async function bindDataCountry(country: string): Promise < binder.Country > {
  try {
    let res = await apiCovidPromise(country)
    return new binder.Country(res.data)
  } catch (err) {
    console.error("Error within bindDataCountry")
    generateError(err, 500, 'External Api Failure');
  }
}