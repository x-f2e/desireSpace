"use strict";

var should = require('should');
var request = require("supertest");
var sailsHelper = require("./../helpers/sailsHelper");
var sails;

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
            console.log(result.body.error);
            done();
          })
      })
    })

    regData.name = 'many sex girls love mp,many sex girls love mp';

    describe('with name length is more than 16', function(){
      it('should return 400 page with error msg', function(done){
        request(sails.getBaseurl())
          .post('/user/register')
          .send(regData)
          .expect(400)
          .end(function (err, result){
            should.not.exist(err);
            should.exist(result);
            console.log(result.body.error);
            done();
          })
      })
    })


  })
})
