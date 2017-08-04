'use strict';
/**
 * 默认情况下，client/listen 并未指定哪些消息将发送至哪里，只是本地定义了模式的话
 * 会发送到本地的模式中，否则会全部发送至服务器中。我们可以通过一些配置来定义那些消息将发送
 * 到哪些服务中，你可以使用一个pin参数来做这件事情
 * 下面这个应用，它将通过TCP发送所有role:math消息发送至服务，而把其它的所有消息发送至本地
 */
require('seneca')()
  .use('math')
  // 监听role:math 消息
  // 重要: 必须匹配客户端
  .listen({ type: 'tcp', pin: 'role:math' });