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
    `
     ▄████▄   ▒█████   ██▒   █▓ ██▓▒█████▄ 
    ▒██▀ ▀█  ▒██▒  ██▒▓██░   █▒▓██▒▒██▀ ██▌
    ▒▓█    ▄ ▒██░  ██▒ ▓██  █▒░▒██▒░██   █▌
    ▒▓▓▄ ▄██▒▒██   ██░  ▒██ █░░░██░░▓█▄   ▌
    ▒ ▓███▀ ░░ ████▓▒░   ▒▀█░  ░██░░▒████▓ 
    ░ ░▒ ▒  ░░ ▒░▒░▒░    ░ ▐░  ░▓   ▒▒▓  ▒ 
      ░  ▒     ░ ▒ ▒░    ░ ░░   ▒ ░ ░ ▒  ▒ 
    ░        ░ ░ ░ ▒       ░░   ▒ ░ ░ ░  ░ 
    ░ ░          ░ ░        ░   ░     ░    
    ░                      ░        ░      `;

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
        `${this.covidLogo}\n` +
        `\n` +
        `Showing stats for: ${style.color.whiteBright.open}${style.bgColor.bgBlueBright.open} ${this.countryName} ${style.bgColor.bgBlueBright.close}${style.color.whiteBright.close}...\n` +
        ` ┌─────────────┐\n` +
        ` │ Population: │ ${style.color.white.open}${this.population}${style.color.white.close}\n` +
        ` └─────────────┘` +
        `\n`;
      return bigString;
    }
  }
}