"use strict";

var uuid = require('uuid');
var should = require('should');
var request = require("supertest");
var sailsHelper = require("./../helpers/sailsHelper");
var sails;

// 定义用户对象
var user_mp = {
  name: 'mp_test' + uuid.v4().substring(0, 4),
  password: 'mp_test_pass',
  email: uuid.v4().substring(0, 4) + '_mp@mp.com'
};

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
        .send(user_mp)
        .expect(200)
        .end(function (err, result){
          should.not.exist(err);
          should.exist(result);
          console.info(result.body);
          return done();
        });
  });

  describe('use the invalid login info', function() {
    it('should return 400 page with error msg with not exist name', function(done){
      var user = {
        name: 'no_mpr0xy',
        password: 'no_password'
      };

      request(sails.getBaseurl())
        .post('/user/login')
        .send(user)
        .expect(400)
        .end(function (err, result){
          should.not.exist(err);
          should.exist(result);
          console.info(result.body.error);
          return done();
        });
    });

    it('should return 400 page with error msg with wrong password', function(done){
      var user = {
        name: 'mpr0xy',
        password: 'no_password'
      };
      request(sails.getBaseurl())
        .post('/user/login')
        .send(user)
        .expect(400)
        .end(function (err, result){
          should.not.exist(err);
          should.exist(result);
          console.info(result.body.error);
          return done();
        });
    });
  });

  describe('use valid login info', function(){
    it('should return 200 page and login success', function(done){

      request(sails.getBaseurl())
        .post('/user/login')
        .send(user_mp)
        .expect(200)
        .end(function (err, result){
          should.not.exist(err);
          should.exist(result);
          console.info(result.body);
          return done();
        });
    });
  })
});
