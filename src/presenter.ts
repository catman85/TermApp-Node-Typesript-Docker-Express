import style from 'ansi-styles'
import {dto} from './dto'
import {formatNumber, generateError} from './utils';

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
    date: string

    population: number;
    casesTotal: number;
    casesNew: number;
    deathsTotal: number;
    deathsNew: number;

    constructor(virusStatsForGivenCountryEndDate: dto.VirusStatsForGivenCountryEndDate, countryName: string, date: string) {
      try {
        this.countryName = countryName;
        this.date = date;

        this.casesTotal = virusStatsForGivenCountryEndDate.casesTotal;
        this.casesNew = virusStatsForGivenCountryEndDate.casesNew;

        this.deathsTotal = virusStatsForGivenCountryEndDate.deathsTotal;
        this.deathsNew = virusStatsForGivenCountryEndDate.deathsNew;
      } catch (err) {
        generateError(500, 'Tried to get porperty of undefined', err)
      }
    }

    getFormatedData(): string {
      return `${this.covidLogo}${style.green.open}\n` +
        `         ${this.getCountryName()} ${style.green.open}\n` +
        `       ┌──────────────────────────────┐\n` +
        `       │ ${this.getDate()}${style.green.open}\n` +
        `       └──────────────────────────────┘\n` +
        `   ┌───────┐     \n` +
        `  ┌┤ ${style.underline.open}Total${style.underline.close} ├─────────────────────────────────────────────────────────┐\n` +
        `  │└───────┘ ${this.getTotalCases()} ${this.getTotalDeaths()}${style.green.open}\n` +
        `  └──────────────────────────────────────────────────────────────────┘\n` +
        `\n` +
        `   ┌───────┐     \n` +
        `  ┌┤ ${style.underline.open}Today${style.underline.close} ├─────────────────────────────────────────────────────────┐\n` +
        `  │└───────┘ ${this.getTodayCases()} ${this.getTodayDeaths()}\n` +
        `${style.green.open}` +
        `  └──────────────────────────────────────────────────────────────────┘\n` +
        `\n` +
        `  ${this.getSignature()}${style.green.close}\n`;
    }

    private getCountryName(): string {
      return `Showing status for ${style.color.whiteBright.open}${style.bgColor.bgBlueBright.open} ${this.countryName} ${style.color.whiteBright.close}${style.bgColor.bgBlueBright.close}...`;
    }

    private getDate(): string {
      return `${style.bold.open}Date: ${style.blueBright.open}${this.date}${style.blueBright.close}${style.bold.close}`;
    }

    private getTotalCases(): string {
      return `${style.bgColor.ansi.hex("FF3B3B")}${style.whiteBright.open} Cases: ${style.color.close}${style.bgColor.close}` +
        `${style.color.ansi.hex("FF3B3B")} ${formatNumber(this.casesTotal)} ${style.color.close}`;
    }

    private getTotalDeaths(): string {
      return `${style.bgWhite.open}${style.black.open} Deaths: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.white.open} ${formatNumber(this.deathsTotal)} ${style.color.close}`;
    }

    private getTodayCases(): string {
      return `${style.bgColor.ansi256.rgb(66, 217, 255)}${style.whiteBright.open} Cases: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi256.rgb(66, 217, 255)} ${formatNumber(this.casesNew)} ${style.color.close}`;
    }

    private getTodayDeaths(): string {
      return `${style.bgColor.ansi.hex("990000")}${style.whiteBright.open} Deaths: ${style.whiteBright.close}${style.bgColor.close}` +
        `${style.color.ansi.hex("990000")} ${formatNumber(this.deathsNew)} ${style.color.close}`;
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