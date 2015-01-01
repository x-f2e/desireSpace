"use strict";

var uuid = require('uuid');
var should = require('should');
var request = require("supertest");
var sailsHelper = require("./../helpers/sailsHelper");
var sails;

// 定义用户对象
var user = {
  name: 'mp_test' + uuid.v4().substring(0, 4),
  password: 'mp_test_pass',
  email: uuid.v4().substring(0, 4) + '_mp@mp.com'
}

// TODO 添加测试前后重置数据库的操作

before(function(done) {
    sailsHelper.build(function(error, _sails) {
        if (error || !_sails) {
            return done(error || "Sails could not be instantiated.");
        }

        sails = _sails;

        return done();
    });
});

describe('test user login', function() {

  before(function(done){
    // 注册一个用户先，这样才能测试登陆
    request(sails.getBaseurl())
        .post('/user/register')
        .send(user)
        .expect(200)
        .end(function (err, result){
          should.not.exist(err);
          should.exist(result);
          console.info(result.body);
          return done();
        });
  });

});
