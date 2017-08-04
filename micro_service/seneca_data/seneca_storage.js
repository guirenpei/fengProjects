'use strict';

const seneca = require('seneca')().use('entity').use('employees');

const employee = {
  name: 'xutengfeng',
  suname: 'xu',
  position: 'Backend Engineer'
};

const addEmployee = () => {
  seneca.act({
    role: 'employee',
    cmd: 'add',
    data: employee
  }, (err, msg) => {
    console.log(msg);
    console.log(typeof msg);
  });
};
addEmployee();