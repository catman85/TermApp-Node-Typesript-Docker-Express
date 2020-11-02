import express from "express";
import requestIp from "request-ip"
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

async function fetchDataCountry(country: string): Promise < binder.Country > {
  try {
    let res = await apiCovidPromise(country)
    return new binder.Country(res.data)
  } catch (err) {
    console.error("Error within fetchDataCountry")
    generateError(err, 500, 'External Api Failure');
  }
}

app.get('/', async (req, res) => {
  let presendedData: any;
  try {
    // Ipv6 Italy example ::ffff:2.17.124.0 
    let ip = req.clientIp;
    let country = await apiCountryFromIp("::ffff:2.17.124.0");
    let countryVirusStats = await fetchDataCountry(country);
    presendedData = countryVirusStats;
  } catch (err) {
    console.error("Something went wrong");
    presendedData = "INTERNAL SERVER ERROR. Try again Later;"
  } finally {
    res.send(presendedData)
  }
})