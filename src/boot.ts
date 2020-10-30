import express from "express";
import {
  getApiPromise
} from './externalApi'
import {
  stats
} from './statistics'
import { convertEpochToSeconds } from './utils'

const app = express();
var globeStats: stats.Globe;
var countryStats: stats.Country;

 async function fetchDataCountry(): Promise < stats.Country > {
  try{
    let res = await getApiPromise()
    countryStats = new stats.Country(res.data)
    stats.last_update_epoch = convertEpochToSeconds(res.data.updated)
    return countryStats;
  }catch(err){
    return err;
  }
}

fetchDataCountry().then(country => {
  return country
}).then(country => {
  country.show();
}).catch(
  err => console.error(err)
)

const port: number = +process.env.SERVER_PORT || 8080;

app.get('/', (req, res) => {
  res.send(countryStats)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})