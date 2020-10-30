"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const externalApi_1 = require("./externalApi");
const statistics_1 = require("./statistics");
const utils_1 = require("./utils");
var globeStats;
var countryStats;
function fetchData() {
    return new Promise((resolve, reject) => {
        externalApi_1.getApiPromise()
            .then(res => {
            countryStats = new statistics_1.stats.Country(res.data);
            statistics_1.stats.last_update_epoch = utils_1.convertEpochToSeconds(res.data.updated);
            resolve(countryStats);
        }).catch(err => {
            reject(err);
        });
    });
}
fetchData().then(res => {
    return res;
}).then(country => {
    country.show();
}).catch(err => console.error(err));
//# sourceMappingURL=boot.js.map