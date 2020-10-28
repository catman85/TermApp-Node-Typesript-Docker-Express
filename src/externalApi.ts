var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://corona.lmao.ninja/v2/countries?yesterday&sort',
  headers: {}
};

export const getDataPromise = function () {
  return axios(config);
}