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
        `  ┌┤ ${style.underline.open}Today${style.underline.close} ├─────────────────────────────────────────────────────────┐\n` +
        `  │└───────┘ ${this.getTodayCasesInColor()} ${this.getTodayRecoveriesInColor()} ${this.getTodayDeathsInColor()}\n` +
        `${style.green.open}` +
        `  └──────────────────────────────────────────────────────────────────┘\n` +
        `${style.green.close}\n`;
      return bigString;
    }

    private getTotalCasesInColor(): string {
      return `${style.bgYellow.open}${style.whiteBright.open} Cases: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.yellow.open} ${this.totalCases} ${style.yellow.close}`;
    }

    private getTotalRecoveriesInColor(): string {
      return `${style.bgColor.ansi256.rgb(252,111,29)}${style.whiteBright.open} Recoveries: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi256.rgb(252,111,29)} ${this.totalRecovered} ${style.magenta.close}`;
    }

    private getTotalDeathsInColor(): string {
      return `${style.bgRed.open}${style.whiteBright.open} Deaths: ${style.bgRed.close}${style.whiteBright.close}` +
        `${style.red.open} ${this.totalDeaths} ${style.red.close}`;
    }

    private getTodayCasesInColor(): string {
      return `${style.bgColor.ansi256.rgb(0, 255, 255)}${style.whiteBright.open} Cases: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi256.rgb(0, 255, 255)} ${this.todayCases} ${style.color.close}`;
    }

    private getTodayRecoveriesInColor(): string {
      return `${style.bgColor.ansi256.rgb(255, 0, 255)}${style.whiteBright.open} Recoveries: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi256.rgb(255 , 0, 255)} ${this.todayRecovered} ${style.color.close}`;
    }

    private getTodayDeathsInColor(): string {
      return `${style.bgColor.ansi256.rgb(180, 0, 0)}${style.whiteBright.open} Deaths: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi256.rgb(180, 0, 0)} ${this.todayDeaths} ${style.color.close}`;
    }
    // private getInversedColors(bg: CSPair & ColorBase, bgText: string, fg: CSPair, fgText: string): string {
    //   return `${bg}${style.whiteBright.open} ${bgText}: ${style.whiteBright.close}${bg}` +
    //     `${fg} ${fgText} ${fg}`;
    // }
  }
}