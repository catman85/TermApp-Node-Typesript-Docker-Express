import style, {
  BackgroundColor,
  ColorBase,
  CSPair,
  Modifier,
  whiteBright
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

    countryName: string
    population: number
    updated: string

    totalCases: number
    totalRecovered: number
    totalDeaths: number
    totalTests: number
    inCriticalState: number
    casesPercentage: string

    todayCases: number | 'n/a'
    todayRecovered: number | 'n/a'
    todayDeaths: number | 'n/a'

    constructor(data: binder.Country) {
      try {
        this.countryName = data.countryName;
        this.population = data.population;
        this.updated = new Date(data.updated).toString();

        this.totalCases = data.virus.totalCases;
        this.totalDeaths = data.virus.totalDeaths;
        this.totalRecovered = data.virus.recovered;
        this.totalTests = data.virus.tests;
        this.inCriticalState = data.virus.inCriticalState;
        this.casesPercentage = data.virus.casesPercentage;

        this.todayCases = data.virus.todayCases != 0 ? data.virus.todayCases : 'n/a';
        this.todayRecovered = data.virus.todayRecovered != 0 ? data.virus.todayRecovered : 'n/a';
        this.todayDeaths = data.virus.todayDeaths != 0 ? data.virus.todayDeaths : 'n/a';
      } catch (err) {
        generateError(err, 500, 'Tried to get porperty of undefined')
      }
    }

    getFormatedData(): string {
      let bigString =
        `${this.covidLogo}${style.green.open}\n` +
        `         ${this.getCountryName()} ${style.green.open}\n` +
        `       ┌──────────────────────────────┐\n` +
        `       │ ${this.getPopulation()}${style.green.open}\n` +
        `       └──────────────────────────────┘\n` +
        `   ┌───────┐     \n` +
        `  ┌┤ ${style.underline.open}Total${style.underline.close} ├─────────────────────────────────────────────────────────┐\n` +
        `  │└───────┘ ${this.getTotalCases()} ${this.getTotalRecoveries()} ${this.getTotalDeaths()}${style.green.open}\n` +
        `  │\n`+
        `  │ ${this.getInCriticalState()} ${this.getTotalTests()} ${this.getCasesPercentage()}${style.green.open}\n` +
        `  └──────────────────────────────────────────────────────────────────┘\n` +
        `\n` +
        `   ┌───────┐     \n` +
        `  ┌┤ ${style.underline.open}Today${style.underline.close} ├─────────────────────────────────────────────────────────┐\n` +
        `  │└───────┘ ${this.getTodayCases()} ${this.getTodayRecoveries()} ${this.getTodayDeaths()}\n` +
        `${style.green.open}` +
        `  └──────────────────────────────────────────────────────────────────┘\n` +
        `\n`+
        `  ${this.getSignature()}${style.green.close}\n`;
      return bigString;
    }

    private getCountryName(): string {
      return `Showing status for ${style.color.whiteBright.open}${style.bgColor.bgBlueBright.open} ${this.countryName} ${style.color.whiteBright.close}${style.bgColor.bgBlueBright.close}...`;
    }

    private getPopulation(): string {
      return `${style.bold.open}Population: ${style.blueBright.open}${this.population}${style.blueBright.close}${style.bold.close}`;
    }

    private getTotalCases(): string {
      return `${style.bgColor.ansi.hex("FF3B3B")}${style.whiteBright.open} Cases: ${style.color.close}${style.bgColor.close}` +
        `${style.color.ansi.hex("FF3B3B")} ${this.totalCases} ${style.color.close}`;
    }

    private getTotalRecoveries(): string {
      return `${style.bgColor.ansi256.rgb(252,111,29)}${style.whiteBright.open} Recoveries: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi256.rgb(252,111,29)} ${this.totalRecovered} ${style.magenta.close}`;
    }

    private getTotalDeaths(): string {
      return `${style.bgWhite.open}${style.black.open} Deaths: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.white.open} ${this.totalDeaths} ${style.color.close}`;
    }

    private getTotalTests(): string {
      return `${style.bgColor.ansi.hex("04BF9D")}${style.whiteBright.open} Tests: ${style.whiteBright.close}${style.bgColor.close}` +
      `${style.color.ansi.hex("04BF9D")} ${this.totalTests} ${style.color.close}`;
    }

    private getInCriticalState(): string {
      return `${style.bgColor.ansi.hex("53C338")}${style.whiteBright.open} Critical: ${style.whiteBright.close}${style.bgColor.close}` +
      `${style.color.ansi.hex("53C338")} ${this.inCriticalState} ${style.color.close}`;
    }

    private getCasesPercentage(): string {
      return `${style.bgColor.ansi256.hex("7B28DB")}${style.whiteBright.open} Cases/100: ${style.whiteBright.close}${style.bgColor.close}` +
      `${style.color.ansi256.hex("7B28DB")} ${this.casesPercentage}% ${style.color.close}`;
    }

    private getTodayCases(): string {
      return `${style.bgColor.ansi256.rgb(66,217,255)}${style.whiteBright.open} Cases: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi256.rgb(66,217,255)} ${this.todayCases} ${style.color.close}`;
    }

    private getTodayRecoveries(): string {
      return `${style.bgColor.ansi256.rgb(255, 0, 255)}${style.whiteBright.open} Recoveries: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi256.rgb(255 , 0, 255)} ${this.todayRecovered} ${style.color.close}`;
    }

    private getTodayDeaths(): string {
      return `${style.bgColor.ansi.hex("990000")}${style.whiteBright.open} Deaths: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi.hex("990000")} ${this.todayDeaths} ${style.color.close}`;
    }

    private getSignature(): string {
      return `${style.color.magenta.open}Visit: ${style.underline.open}github.com/catman85${style.underline.close} for more${style.color.magenta.close}`
    }
    // private getInversedColors(bg: CSPair & ColorBase, bgText: string, fg: CSPair, fgText: string): string {
    //   return `${bg}${style.whiteBright.open} ${bgText}: ${style.whiteBright.close}${bg}` +
    //     `${fg} ${fgText} ${fg}`;
    // }
  }
}