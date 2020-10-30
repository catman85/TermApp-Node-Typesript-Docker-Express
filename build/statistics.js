"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
var stats;
(function (stats) {
    class Printable {
        show() {
            console.log(this);
        }
        ;
    }
    class Virus extends Printable {
        constructor(api_result) {
            super();
            try {
                this.totalCases = api_result.cases;
                this.todayCases = api_result.todayCases;
                this.deaths = api_result.deaths;
                this.todayDeaths = api_result.todayDeaths;
                this.recovered = api_result.recovered;
                this.todayRecovered = api_result.todayRecovered;
                this.inCriticalState = api_result.critical;
                this.tests = api_result.tests;
            }
            catch (err) {
                utils_1.generateError(err, 500);
            }
        }
    }
    stats.Virus = Virus;
    class Country extends Printable {
        constructor(api_result) {
            super();
            try {
                this.countryName = api_result.country;
                this.continent = api_result.continent;
                this.population = api_result.population;
                this.virus = new Virus(api_result);
            }
            catch (err) {
                utils_1.generateError(err, 500);
            }
        }
    }
    stats.Country = Country;
    class Globe {
    }
    stats.Globe = Globe;
})(stats = exports.stats || (exports.stats = {}));
//# sourceMappingURL=statistics.js.map