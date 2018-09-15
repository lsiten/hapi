const GROUP_NAME = 'xuechao';
const Joi = require('Joi');
const xuechao = require('../controller/xuechao.js');
module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      let returnData = [];
      await xuechao.getData();
      reply('success');
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取学巢数据',
    },
  }
];