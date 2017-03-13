'use strict';

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
// routes
const Login = require('../app/controllers/login');

module.exports = function(app) {
  // 设置跨域访问
  app.all('/react/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });
  app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
  });
	// Blog
  // app.get('/mmBlog', Index.blog);

	// Index 页面
  // app.get('/', Story.index); // 个人网站分类页面
	// Story

};
