import {
  getApiPromise
} from './externalApi'
import {
  stats
} from './statistics'

var globeStats: stats.Globe;
var countryStats: stats.Country;

function fetchData(): Promise < stats.Country > {
  return new Promise((resolve, reject) => {
    getApiPromise()
      .then(res => {
        countryStats = new stats.Country(res.data)
        stats.last_update_epoch = res.data.updated
        resolve(countryStats)
      }).catch(err => {
        reject(err)
      })
  })
}

fetchData().then(res => {
  return res
}).then(country => {
  country.show();
}).catch(
  err => console.error(err)
)