import {
  getDataPromise
} from './externalApi'

getDataPromise().then(res =>
  console.log(res.status)
)