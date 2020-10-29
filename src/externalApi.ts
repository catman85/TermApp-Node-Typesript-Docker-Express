import * as util from './utils'
const cacheRefreshRate: number = 3 * util.hours;
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://corona.lmao.ninja/v2/countries/Greece?yesterday&sort',
  headers: {}
};

var cache: util.Cache = {
  data: {},
  last_update_epoch: 0
};

export const getApiPromise = function (): Promise < any > {
  return new Promise((resolve, reject) => {
    if (util.cacheIsFresh(cache, cacheRefreshRate)) {
      resolve(cache)
      return
    }

    axios(config)
      .then(res => {
        saveInCache(res)
        resolve(res)
      }).catch(err => reject(err))
  })
}

function saveInCache(res): void {
  cache = {
    data: res,
    last_update_epoch: util.getCurrentTimestampInSeconds()
  }
}

