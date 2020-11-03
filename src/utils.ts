const hours: number = 3600;
const minutes: number = 60;

function getCurrentTimestampInSeconds(): number {
  return convertEpochToSeconds(Date.now())
}

function convertEpochToSeconds(epoch: number): number {
  return ((Math.floor(epoch / 1000)));
}
// err: any, code: number, message: string
function generateError(...args: any[]): never { // never returns
  // ALL the catches of the upper layers will be triggered
  // But only the message of the last layer will be printed
  throw {
    message: args[2] + ' ' + args[0],
    errorCode: args[1]
  };
}

function isCommandline(userAgent): boolean {
  return userAgent.search(/curl|wget/i) !== -1;

};
export {
  hours,
  minutes,
  isCommandline,
  getCurrentTimestampInSeconds,
  convertEpochToSeconds,
  generateError
}