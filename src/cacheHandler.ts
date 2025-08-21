import * as util from './utils'
import {CountryDailyStatistics} from "./types";

export class CacheHandler {
  private static instance: CacheHandler;
  private static cache: Map<string, Cache> = new Map();

  private static cacheRefreshRateSeconds: number = 30 * util.MINUTES_IN_SECS;

  private constructor() {
  } // Singleton Pattern

  public static getInstance(): CacheHandler {
    if (!CacheHandler.instance) {
      CacheHandler.instance = new CacheHandler();
    }
    return CacheHandler.instance;
  }

  public addInCache(key: string, content: CountryDailyStatistics): void {
    CacheHandler.cache.set(key, new Cache(content, util.getCurrentTimestampInSeconds()));
  }

  public getContent(key: string): CountryDailyStatistics {
    const result = CacheHandler.cache.get(key);
    if (!result) return;
    return result.data;
  }

  public isFresh(key: string): boolean {
    const entryExists = this.exists(key);
    if (!entryExists) return;

    const entryUpdateEpoch = CacheHandler.cache.get(key).lastUpdateEpoch;
    const currentEpoch = util.getCurrentTimestampInSeconds();
    const isRecent: boolean = entryUpdateEpoch + CacheHandler.cacheRefreshRateSeconds > currentEpoch;
    if (!isRecent) {
      console.log('Cache entry found for given key, but it\'s old.')
      return false;
    }
    return true;
  }

  private exists(key: string): boolean {
    const exists = Boolean(this.getContent(key));
    if (exists) {
      console.log("Cache Found for given key :)")
    } else {
      console.log('Cache entry not found for given key.')
    }
    return exists;
  }

}

class Cache {
  data: CountryDailyStatistics
  lastUpdateEpoch: number // timestamp unix epoch in seconds

  constructor(data: CountryDailyStatistics, lastUpdateEpoch: number) {
    this.data = data
    this.lastUpdateEpoch = lastUpdateEpoch;
  }
}