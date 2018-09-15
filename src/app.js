const routes = require('./router/index')
const config = require('./config/index')
// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
// app.js
const Hapi = require('hapi');

const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection(config.connect);

const init = async () => {
  await server.register([
    // 为系统使用 hapi-swagger
    ...pluginHapiSwagger,
  ]);
  server.route(routes);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();