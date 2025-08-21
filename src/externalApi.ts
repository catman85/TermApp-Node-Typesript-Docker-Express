import * as util from './utils';
import {
  generateError,
  getCacheKey,
  getCountryByIpAxiosConfig,
  getCovidApiAxiosConfig,
  getLatestCountryStatistics
} from './utils';
import {CacheHandler} from './cacheHandler';
import {
  AxiosResponse,
  CountryDailyStatistics,
  Covid19ApiRequestSelection,
  Covid19ApiResponse,
  IpApiResponse
} from "./types";

const axios = require('axios');
const cacheHandler: CacheHandler = CacheHandler.getInstance();


export const countryStatisticsPromise = async (country: string, dateToCheck: string, type: Covid19ApiRequestSelection): Promise<CountryDailyStatistics> => {
  const cacheKey = getCacheKey(country, dateToCheck, type);

  if (cacheHandler.isFresh(cacheKey)) {
    return cacheHandler.getContent(cacheKey)
  }

  try {
    const axiosConfig = getCovidApiAxiosConfig(country, type);
    const res: AxiosResponse<Covid19ApiResponse> = await axios(axiosConfig)
    if (!res) generateError(500, 'fail');

    const countrySpecificStatistics: CountryDailyStatistics = getLatestCountryStatistics(res, dateToCheck, type);
    if (!countrySpecificStatistics) generateError(500, 'country not found');

    cacheHandler.addInCache(cacheKey, countrySpecificStatistics)
    return countrySpecificStatistics;
  } catch (err) {
    // catching an error and throwing it again
    util.generateError(500, "External Covid Api Failure", err)
  }
}

export const countryFromIpPromise = async (ipv6: string): Promise<string> => {
  try {
    const result: AxiosResponse<IpApiResponse> = await axios(getCountryByIpAxiosConfig(ipv6))

    if (result.data.status === 'fail') {
      console.error("Ip Server result status fail")
      util.generateError(500, 'Invalid ip sent to api')
    }
    return result.data.country;
  } catch (err) {
    // Error is handled here.
    // No need to generate a new one
    return "Greece"; // Default Country
  }
}

