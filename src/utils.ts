import dayjs from "dayjs";

const hourInSecs: number = 3600;
const minuteInSecs: number = 60;

function getCurrentTimestampInSeconds(): number {
  return dayjs().unix()
}

// err: any, code: number, message: string
function generateError(code: number, message: string, err?: any,): never { // never returns
  // ALL the catches of the upper layers will be triggered
  // But only the message of the last layer will be printed
  const errorMessage = message + ' ' + err.toString();
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

export {
  hourInSecs,
  minuteInSecs,
  isCommandline,
  getCurrentTimestampInSeconds,
  generateError,
  getCurrentDate
}