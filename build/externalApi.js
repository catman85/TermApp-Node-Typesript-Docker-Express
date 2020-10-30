"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(require("./utils"));
const cacheRefreshRate = 3 * util.hours;
var axios = require('axios');
var config = {
    method: 'get',
    url: 'https://corona.lmao.ninja/v2/countries/Greece?yesterday&sort',
    headers: {}
};
var cache = {
    data: {},
    last_update_epoch: 0
};
exports.getApiPromise = function () {
    return new Promise((resolve, reject) => {
        if (util.cacheIsFresh(cache, cacheRefreshRate)) {
            resolve(cache);
            return;
        }
        axios(config)
            .then(res => {
            saveInCache(res);
            resolve(res);
        }).catch(err => reject(err));
    });
};
function saveInCache(res) {
    cache = {
        data: res,
        last_update_epoch: util.getCurrentTimestampInSeconds()
    };
}
//# sourceMappingURL=externalApi.js.map