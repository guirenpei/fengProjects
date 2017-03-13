'use strict';
/* eslint no-console: 0 */

const co = require('co');
const log = require('rainbowlog');

exports.login = function(req, res) {
  let mimi = req.query.mimi;
  let xingmen = req.query.xingmen;
  let user = req.session.user;
  console.log('mimi', mimi);
  console.log('xingmen', xingmen);
  if (user.username && user.username === 'xutengfeng') {
    return res.redirect('/live', {user});
  }
  return res.redirect('/main', {
    user
  });
};
