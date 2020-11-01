import * as util from './utils'

export class CacheHandler {
  private static instance: CacheHandler;
  private static cache: Map < string, Cache > = new Map();

  //private const cacheRefreshRateSeconds: number = 1 * util.hours;
  private static cacheRefreshRateSeconds: number = 15;

  public static getInstance(): CacheHandler {
    if (!CacheHandler.instance) {
      CacheHandler.instance = new CacheHandler();
    }
    return CacheHandler.instance;
  }
  private constructor() {} // Singleton Pattern

  public addInCache(key: string, content: any): void {
    CacheHandler.cache.set(key, new Cache(content, util.getCurrentTimestampInSeconds()));
  }

  public getContent(key: string): any {
    let res = CacheHandler.cache.get(key);
    if (res) {
      return res.data;
    } else {
      console.log('Cache entry not found')
      return undefined;
    };
  }

  public isFresh(key: string): boolean {
    let exists_cond1: boolean = this.exists(key);
    if (!exists_cond1) {
      return false;
    }
    let is_recent_cond2: boolean = CacheHandler.cache.get(key).last_update_epoch + CacheHandler.cacheRefreshRateSeconds > util.getCurrentTimestampInSeconds();
    if (!is_recent_cond2) {
      return false;
    }
    return true;
  }

  private exists(key: string): boolean {
    return this.getContent(key) !== undefined;
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