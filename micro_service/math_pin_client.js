'use strict';

require('seneca')()
  // 本地模式
  .add('say:hello', (msg, reply) => {
    reply(null, { text: 'hi' });
  })
  // 发送role:math 模式至服务
  // 注意: 必须匹配服务端
  .client({ type: 'tcp', pin: 'role:math' })
  // 远程操作
  .act('role:math, cmd:sum, left: 2, right: 3', console.log)
  // 本地操作
  .act('say:hello', console.log);