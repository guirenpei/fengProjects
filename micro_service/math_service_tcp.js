'use strict';
/**
 * 在seneca中，我们通过seneca.listen 方法创建微服务，然后通过seneca.client去与微服务进行通信
 * 其中seneca.listen seneca.client 方法都可以接受下面这些参数
 * port: 可选的数字，表示端口号
 * host: 可选的字符串，表示主机名或者IP地址
 * sepc: 可选的对象，完整的定制对象
 * 注意: 在windows系统中，如果未制定host，默认会连接0.0.0.0，这是没有任何用处的，可以设置
 * host为localhost
 * 虽然HTTP协议很方便，但并不是所有时间都合适，另一个常用的协议是TCP，
 * 我们可以很容易的使用TCP协议来进行数据的传输
 */
require('seneca')().use('math').listen({ type: 'tcp' });