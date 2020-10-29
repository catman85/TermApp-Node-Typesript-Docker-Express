import {
  getDataPromise
} from './externalApi'

let sum = 3 + 5

getDataPromise().then(res =>
  console.log(res.status)
)