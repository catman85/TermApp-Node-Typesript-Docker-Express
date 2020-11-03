import style from 'ansi-styles'
import {
  binder
} from './binder'
import {
  generateError
} from './utils';

export namespace presentInTerm {

  export class Stats {

    covidLogo: string =
    `${style.color.greenBright.open}
     ▄████▄   ▒█████   ██▒   █▓ ██▓▒█████▄ 
    ▒██▀ ▀█  ▒██▒  ██▒▓██░   █▒▓██▒▒██▀ ██▌
    ▒▓█    ▄ ▒██░  ██▒ ▓██  █▒░▒██▒░██   █▌
    ▒▓▓▄ ▄██▒▒██   ██░  ▒██ █░░░██░░▓█▄   ▌
    ▒ ▓███▀ ░░ ████▓▒░   ▒▀█░  ░██░░▒████▓ 
    ░ ░▒ ▒  ░░ ▒░▒░▒░    ░ ▐░  ░▓   ▒▒▓  ▒ 
      ░  ▒     ░ ▒ ▒░    ░ ░░   ▒ ░ ░ ▒  ▒ 
    ░        ░ ░ ░ ▒       ░░   ▒ ░ ░ ░  ░ 
    ░ ░          ░ ░        ░   ░     ░    
    ░                      ░        ░      
    ${style.color.greenBright.close}`;

    countryName: string;
    population: number

    totalCases: number
    totalDeaths: number
    totalRecovered: number

    todayCases: number
    todayRecovered: number
    todayDeaths: number

    constructor(data: binder.Country) {
      try {
        this.countryName = data.countryName;
        this.population = data.population;
        this.totalCases = data.population;
        this.totalDeaths = data.virus.totalDeaths;
        this.totalRecovered = data.virus.recovered;
        this.todayCases = data.virus.todayCases;
        this.todayRecovered = data.virus.todayRecovered;
        this.todayDeaths = data.virus.todayDeaths;
      } catch (err) {
        generateError(err, 500, 'Tried to gate porperty of undefined')
      }
    }

    getFormatedData(): string {
      let bigString =
        `${this.covidLogo}${style.green.open}\n` +
        `         Showing status for: ${style.whiteBright.open}${style.bgBlueBright.open} ${this.countryName} ${style.bgBlueBright.close}${style.whiteBright.close}\n` +
        `${style.green.open}`+
        `       ┌─────────────────────────────┐\n` +
        `       │ Population: ${style.color.white.open}${this.population}${style.color.white.close}${style.green.open}\n` +
        `       └─────────────────────────────┘` +
        `\n`+
        `   ┌───────┐     \n`+
        `  ┌┤ Total ├──── \n`+
        `  │└───────┘            \n`+
        `  └───────────────────\n`+
        `\n`+
        `   ┌───────┐     \n`+
        `  ┌┤ Today ├──── \n`+
        `  │└───────┘            \n`+
        `  └───────────────────\n`+
        `${style.green.close}\n`;
      return bigString;
    }
  }
}