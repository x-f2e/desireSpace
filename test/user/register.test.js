"use strict";

var should = require('should');
var request = require("supertest");
var sailsHelper = require("./../helpers/sailsHelper");
var sails;

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



describe('test for user register', function() {

  describe('with invalid user Data', function() {
    var regData = {
      name: 'mp',
      password: 'password',
      email: 'mpr0xy@live.com'
    }

    describe('with name length is less than 4', function(){
      it('should return 400 page with error msg', function(done){
        request(sails.getBaseurl())
          .post('/user/register')
          .send(regData)
          .expect(400)
          .end(function (err, result){
            should.not.exist(err);
            should.exist(result);
            console.info(result.body.error);
            done();
          })
      })
    })

    describe('with name length is more than 16', function(){
      it('should return 400 page with error msg', function(done){
        regData.name = 'many sex girls love mp,many sex girls love mp';
        request(sails.getBaseurl())
          .post('/user/register')
          .send(regData)
          .expect(400)
          .end(function (err, result){
            should.not.exist(err);
            should.exist(result);
            console.info(result.body.error);
            done();
          })
      })
    });

    describe('with password length is less than 6 or more than 32', function(){
      it('should return 400 page with error msg', function(done){
        regData.name = 'mpr0xy';
        regData.password = 'xxoo';
        request(sails.getBaseurl())
          .post('/user/register')
          .send(regData)
          .expect(400)
          .end(function (err, result){
            should.not.exist(err);
            should.exist(result);
            console.info(result.body.error);
            done();
          })
      });


      it('should return 400 page with error msg', function(done){
        // 把密码搞成32位以上
        for(var i = 0; i < 9; i++){
          regData.password += 'xxoo';
        }
        request(sails.getBaseurl())
          .post('/user/register')
          .send(regData)
          .expect(400)
          .end(function (err, result){
            should.not.exist(err);
            should.exist(result);
            console.info(result.body.error);
            done();
          })
      });
    });


    describe('with invalid email', function(){
      it('should return 400 page with error msg', function(done){
        regData.password = 'my_password';
        regData.email = 'this is my kid email';
        request(sails.getBaseurl())
          .post('/user/register')
          .send(regData)
          .expect(400)
          .end(function (err, result){
            should.not.exist(err);
            should.exist(result);
            console.info(result.body.error);
            done();
          })
      })
    });

    describe('with valid register data', function(){
      it('should return 200 page with NO error msg', function(done){
        regData.password = 'my_password';
        regData.email = 'mpr0xy@live.com';
        request(sails.getBaseurl())
          .post('/user/register')
          .send(regData)
          .expect(200)
          .end(function (err, result){
            should.not.exist(err);
            should.exist(result);
            console.info(result.body);
            done();
          })
      })
    });

  })
})
