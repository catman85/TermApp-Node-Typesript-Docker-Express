import express from "express";
import requestIp from "request-ip"
import {
  apiCountryFromIp,
  apiCovidPromise
} from './externalApi'
import {
  stats
} from './statistics'
import {
  generateError
} from './utils'

const app = express();
var countryStats: stats.Country;

async function fetchDataCountry(): Promise < stats.Country > {
  try {
    let country = await apiCountryFromIp("::ffff:2.17.124.0");
    let res = await apiCovidPromise(country)
    countryStats = new stats.Country(res.data)
    return countryStats;
  } catch (err) {
    console.log("TST")
    generateError(err, 500, 'External Api Failure');
  }
}

fetchDataCountry().then(country => {
  return country
}).then(countryS => {
  countryS.show();
}).catch(
  err => {
    console.error(err)
    console.log("TEST")
  }
)

const port: number = +process.env.SERVER_PORT || 8080;

app.use(requestIp.mw())
app.get('/', (req, res) => {
  let ip = req.clientIp; // Ipv6 Italy example ::ffff:2.17.124.0 
  res.send(ip)
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})