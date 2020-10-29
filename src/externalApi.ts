var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://corona.lmao.ninja/v2/countries/Greece?yesterday&sort',
  headers: {}
};

// TODO: cache
export const getApiPromise = function (): Promise < any > {
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}