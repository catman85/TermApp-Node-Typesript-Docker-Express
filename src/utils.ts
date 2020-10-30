interface Cache {
  data: any,
    last_update_epoch: number
}

const hours: number = 3600;

function getCurrentTimestampInSeconds(): number {
  return convertEpochToSeconds(Date.now())
}

function convertEpochToSeconds(epoch: number): number {
    return ((Math.floor(epoch / 1000)));
}


function cacheIsFresh(cache: Cache, gap: number): boolean {
  if (cache.data !== undefined && (cache.last_update_epoch + gap) > getCurrentTimestampInSeconds()) {
    return true;
  } else {
    return false
  }
}

function generateError(message: string, code: number):never{
    throw{message:message,errorCode:code};
}

export {
  Cache,
  hours,
  getCurrentTimestampInSeconds,
  convertEpochToSeconds,
  cacheIsFresh,
  generateError
}