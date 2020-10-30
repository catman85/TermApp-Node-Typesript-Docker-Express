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

export const getApiPromise = async (): Promise < any > => {
  if (util.cacheIsFresh(cache, cacheRefreshRate)) {
    return Promise.resolve(cache);
  }

  try{
    let res = await axios(config)
    saveInCache(res)
    return Promise.resolve(res);
  }catch(err){
    return Promise.reject(err);
  }
}

function saveInCache(res): void {
  cache = {
    data: res,
    last_update_epoch: util.getCurrentTimestampInSeconds()
  }
}