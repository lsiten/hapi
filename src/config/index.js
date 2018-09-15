const Joi = require('Joi');
module.exports = {
  connect: {
    port: 3000,
    host: '127.0.0.1',
  },
  validate: {
    query: {
      limit: Joi.number().integer().min(1).default(10)
                .description('每页的条目数'),
      page: Joi.number().integer().min(1).default(1)
               .description('页码数')
    },
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown()
  }
}