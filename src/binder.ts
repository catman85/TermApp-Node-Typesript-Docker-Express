import {
  generateError
} from './utils'

export namespace binder {

  class Printable {
    show(): void {
      console.log(this)
    };
  }

  export class Virus extends Printable {
    totalCases: number
    todayCases: number
    totalDeaths: number
    todayDeaths: number
    recovered: number
    todayRecovered: number
    inCriticalState: number
    tests: number

    constructor(api_result: any) {
      super()
      try {
        this.totalCases = api_result.cases;
        this.todayCases = api_result.todayCases;
        this.totalDeaths = api_result.deaths;
        this.todayDeaths = api_result.todayDeaths;
        this.recovered = api_result.recovered;
        this.todayRecovered = api_result.todayRecovered;
        this.inCriticalState = api_result.critical;
        this.tests = api_result.tests;
      } catch (err) {
        generateError(err, 500, 'Tried to get undefined.element')
      }

    }
  }

  export class Country extends Printable {
    countryName: string
    continent: string
    population: number
    virus: Virus

    constructor(api_result: any) {
      super()
      try {
        this.countryName = api_result.country;
        this.continent = api_result.continent;
        this.population = api_result.population;
        this.virus = new Virus(api_result)
      } catch (err) {
        generateError(err, 500, 'Tried to get undefined.element')
      }
    }
  }

}