"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hours = 3600;
exports.hours = hours;
function getCurrentTimestampInSeconds() {
    return convertEpochToSeconds(Date.now());
}
exports.getCurrentTimestampInSeconds = getCurrentTimestampInSeconds;
function convertEpochToSeconds(epoch) {
    return ((Math.floor(epoch / 1000)));
}
exports.convertEpochToSeconds = convertEpochToSeconds;
function cacheIsFresh(cache, gap) {
    if (cache.data !== undefined && (cache.last_update_epoch + gap) > getCurrentTimestampInSeconds()) {
        return true;
    }
    else {
        return false;
    }
}
exports.cacheIsFresh = cacheIsFresh;
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
exports.generateError = generateError;
//# sourceMappingURL=utils.js.map