import {dto} from "../dto";

type Covid19ApiRequest = {
  date?: string
  country?: string
  region?: string
  type?: Covid19ApiRequestSelection
}

type Covid19ApiRequestSelection = 'cases' | 'deaths'

type Covid19ApiResponse = CountryStatistics[]

type CountryStatistics = {
  country: string
  region: string
  cases?: CountryStatsByDate
  deaths?: CountryStatsByDate;
}

type CountryDailyStatistics = {
  total: number
  new: number
}

type CountryStatsByDate = Record<string, CountryDailyStatistics>

type IpApiResponse = {
  status: string,
  message: string,
  query: string,
  country: string
  countryCode: string,
  region: number,
  regionName: string,
  city: string,
  zip: string,
  lat: number,
  lon: number,
  timezone: string,
  isp: string,
  org: string,
  as: string,
}

type FetchMethod = "get" | "post";

type AxiosConfig = {
  method: FetchMethod
  url: string
  headers: any
}

type AxiosResponse<R> = {
  status: number
  statusText: string
  config: AxiosConfig
  data: R
}

type FinalResult = string | dto.VirusStatsForGivenCountryEndDate;

export {
  Covid19ApiResponse,
  CountryStatsByDate,
  CountryDailyStatistics,
  Covid19ApiRequest,
  CountryStatistics,
  FetchMethod,
  AxiosConfig,
  AxiosResponse,
  IpApiResponse,
  FinalResult, Covid19ApiRequestSelection
}