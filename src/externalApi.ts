import * as util from './utils';
import {
  CacheHandler
} from './cacheHandler';

var axios = require('axios');
const cacheHandler: CacheHandler = CacheHandler.getInstance();

type fetchMethod = "get" | "post";
interface axiosConfig {
  method: fetchMethod
  url: string
  headers: any
}

var customUrl = {
  a: 'https://corona.lmao.ninja/v2/countries/',
  country: 'Greece',//default
  b: '?yesterday&sort'
}

var configGetCountryByIp: axiosConfig = {
  method: 'get',
  url: 'http://ip-api.com/json/',
  headers: {}
}

var configGetCovidByCountry: axiosConfig = { 
  method: 'get',
  url: customUrl.a + customUrl.country + customUrl.b,
  headers: {}
}

export const apiCovidPromise = async (country: string): Promise < any > => {
  if (cacheHandler.isFresh(country)) {
    return cacheHandler.getContent(country)
  }

  setCountryAxiosCovidConfig(country);

  try {
    let res = await axios(configGetCovidByCountry)
    cacheHandler.addInCache(country, res)
    return res;
  } catch (err) {
    // catching an error and throwing it again
    util.generateError(err,500,"External Covid Api Failure")
  }
}

export const apiCountryFromIp = async (ip: string): Promise < string > => {
  try{
    let conf = configGetCountryByIp;
    conf.url = conf.url + ip;
    let result = await axios(conf)
    return result.data.country;
  }catch(err){
    console.error(err)
    return "Greece";// Default Country
  }
}

function setCountryAxiosCovidConfig(country: string): void{
  customUrl.country = country;
  configGetCovidByCountry.url = customUrl.a + customUrl.country + customUrl.b
}