import dayjs from "dayjs";
import {AxiosConfig, CountryDailyStatistics, CountryStatsByDate, Covid19ApiRequestSelection} from "./types";

const HOURS_IN_SECS = 3600;
const MINUTES_IN_SECS = 60;

const LATEST_RECORD_DATE = '2023-03-09'

function getCurrentTimestampInSeconds(): number {
  return dayjs().unix()
}

// err: any, code: number, message: string
function generateError(code: number, message?: string, err?: any,): never {
  // never returns
  // ALL the catches of the upper layers will be triggered
  // But only the message of the last layer will be printed
  const errorMessage = (message ? message : '') + ' ' + err.toString();
  console.error(errorMessage)
  throw {
    message: errorMessage,
    errorCode: code
  };
}

// Returns current date in YYYY-MM-DD format
function getCurrentDate(): string {
  return dayjs().format('YYYY-MM-DD');
}

function isCommandline(userAgent: string): boolean {
  return userAgent.search(/curl|wget/i) !== -1;
}

function getCovidApiAxiosConfig(country: string, type: Covid19ApiRequestSelection): AxiosConfig {
  // curl --request GET \
  //     --url 'https://api.api-ninjas.com/v1/covid19?date=2021-01-01' \
  //     --header 'X-Api-Key: api_key'

  // curl --request GET \
  //     --url 'https://api.api-ninjas.com/v1/covid19?country=greece' \
  //     --header 'X-Api-Key: api_key'


  return {
    method: 'get',
    url: 'https://api.api-ninjas.com/v1/covid19?country=' + country + '&type=' + type,
    headers: {
      'X-Api-Key': process.env.NINJA_API_KEY
    }
  }
}

function getCountryByIpAxiosConfig(ipv6: string): AxiosConfig {
  // Ipv6 Italy example ::ffff:2.17.124.0
  return {
    method: 'get',
    url: 'http://ip-api.com/json/' + ipv6,
    headers: {}
  }
}

function getLatestCountryStatistics(countryCases: CountryStatsByDate, dateToCheck: string): CountryDailyStatistics {
  if (!countryCases) return {
    total: 0,
    new: 0
  }

  const countrySpecificStatistics: CountryDailyStatistics = countryCases[dateToCheck];
  if (!countrySpecificStatistics) return countryCases[LATEST_RECORD_DATE]
  return countrySpecificStatistics
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

export {
  HOURS_IN_SECS,
  MINUTES_IN_SECS,
  isCommandline,
  getCurrentTimestampInSeconds,
  generateError,
  formatNumber,
  getCurrentDate, getCovidApiAxiosConfig, getCountryByIpAxiosConfig, getLatestCountryStatistics
}