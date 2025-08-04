import * as util from './utils'

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

  public addInCache(key: string, content: any): void {
    CacheHandler.cache.set(key, new Cache(content, util.getCurrentTimestampInSeconds()));
  }

  public getContent(key: string): any {
    let res = CacheHandler.cache.get(key);
    if (!res) return;
    return res.data;
  }

  public isFresh(key: string): boolean {
    const entryExists = this.exists(key);
    if (!entryExists) return;

    const entryUpdateEpoch = CacheHandler.cache.get(key).last_update_epoch;
    const currentEpoch = util.getCurrentTimestampInSeconds();
    let is_recent_cond2: boolean = entryUpdateEpoch + CacheHandler.cacheRefreshRateSeconds > currentEpoch;
    if (!is_recent_cond2) {
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
  data: any
  last_update_epoch: number

  constructor(data: any, last_update_epoch: number) {
    this.data = data
    this.last_update_epoch = last_update_epoch;
  }
}