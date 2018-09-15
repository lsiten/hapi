const orders = require('./orders.js');
const shops = require('./shops.js');
const xuechao = require('./getData.js');
module.exports = [
  ...orders,
  ...shops,
  ...xuechao
]
