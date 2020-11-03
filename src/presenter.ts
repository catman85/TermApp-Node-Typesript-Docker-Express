import style, {
  BackgroundColor,
  ColorBase,
  CSPair,
  Modifier
} from 'ansi-styles'
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
    totalRecovered: number
    totalDeaths: number

    todayCases: number
    todayRecovered: number
    todayDeaths: number

    constructor(data: binder.Country) {
      try {
        this.countryName = data.countryName;
        this.population = data.population;

        this.totalCases = data.virus.totalCases;
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
        `${style.green.open}` +
        `       ┌──────────────────────────────┐\n` +
        `       │ ${style.bold.open}Population${style.bold.close}: ${style.blueBright.open}${this.population}${style.blueBright.close}\n` +
        `${style.green.open}` +
        `       └──────────────────────────────┘` +
        `\n` +
        `   ┌───────┐     \n` +
        `  ┌┤ ${style.underline.open}Total${style.underline.close} ├─────────────────────────────────────────────────────────┐\n` +
        `  │└───────┘ ${this.getTotalCasesInColor()} ${this.getTotalRecoveriesInColor()} ${this.getTotalDeathsInColor()}\n` +
        `${style.green.open}` +
        `  └──────────────────────────────────────────────────────────────────┘\n` +
        `\n` +
        `   ┌───────┐     \n` +
        `  ┌┤ ${style.underline.open}Today${style.underline.close} ├──── \n` +
        `  │└───────┘            \n` +
        `  └───────────────────\n` +
        `${style.green.close}\n`;
      return bigString;
    }

    private getTotalCasesInColor(): string {
      return `${style.whiteBright.open}${style.bgYellow.open} Cases: ${style.bgYellow.close}${style.whiteBright.close}` +
        `${style.yellow.open} ${this.totalCases} ${style.yellow.close}`;
    }

    private getTotalRecoveriesInColor(): string {
      return `${style.bgMagenta.open}${style.whiteBright.open} Recoveries: ${style.bgMagenta.close}${style.whiteBright.close}` +
        `${style.magenta.open} ${this.totalRecovered} ${style.magenta.close}`;
    }

    private getTotalDeathsInColor(): string {
      return `${style.bgRed.open}${style.whiteBright.open} Deaths: ${style.bgRed.close}${style.whiteBright.close}` +
        `${style.red.open} ${this.totalDeaths} ${style.red.close}`;
    }

    // private getInversedColors(bg: CSPair & ColorBase, bgText: string, fg: CSPair, fgText: string): string {
    //   return `${bg}${style.whiteBright.open} ${bgText}: ${style.whiteBright.close}${bg}` +
    //     `${fg} ${fgText} ${fg}`;
    // }
  }
}