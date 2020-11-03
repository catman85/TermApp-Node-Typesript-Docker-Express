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
  country: 'Greece', //default
  b: '?yesterday'
}

var urlWithIp = {
  fixed: 'http://ip-api.com/json/',
  ip: '::ffff:2.17.124.0' //Italy example Ipv6
}

var configGetCountryByIp: axiosConfig = {
  method: 'get',
  url: urlWithIp.fixed + urlWithIp.ip,
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
    util.generateError(err, 500, "External Covid Api Failure")
  }
}

export const apiCountryFromIp = async (ip: string): Promise < string > => {
  try {
    setIpApiAxiosConfig(ip)
    let result = await axios(configGetCountryByIp)

    if (result.data.status === 'fail') {
      console.error("Ip Server result status fail")
      util.generateError('Invalid ip sent to api', 500)
    }
    return result.data.country;
  } catch (err) {
    // Error is handled here.
    // No need to generate a new one
    return "Greece"; // Default Country
  }
}

function setCountryAxiosCovidConfig(country: string): void {
  customUrl.country = country;
  configGetCovidByCountry.url = customUrl.a + customUrl.country + customUrl.b
}

function setIpApiAxiosConfig(ip: string): void {
  urlWithIp.ip = ip;
  configGetCountryByIp.url = urlWithIp.fixed + urlWithIp.ip;
}