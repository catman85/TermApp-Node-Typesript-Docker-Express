import * as util from './utils';
import {generateError, getCountryByIpAxiosConfig, getCovidApiAxiosConfig, getLatestCountryStatistics} from './utils';
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
  if (cacheHandler.isFresh(country)) {
    return cacheHandler.getContent(country)
  }

  try {
    const axiosConfig = getCovidApiAxiosConfig(country, type);
    const res: AxiosResponse<Covid19ApiResponse> = await axios(axiosConfig)
    if (!res) generateError(500, 'fail');

    const countryStats = type === 'cases' ? res.data[0].cases : res.data[0].deaths
    const countrySpecificStatistics: CountryDailyStatistics = getLatestCountryStatistics(countryStats, dateToCheck);
    if (!countrySpecificStatistics) generateError(500, 'country not found');

    const cacheKey = country + dateToCheck + type
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

