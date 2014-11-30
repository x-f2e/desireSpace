/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var validator = require('validator');
var async = require("async");

/**
 * 自定义函数
 ********************************************/

/**
 * 验证一个用户的数据是否正确
 * @param  {sails.model.Users}  user
 * @return {{
 *          isValidate: Boolean,
 *          msg: String,
 * }} 返回是否是有效的用户信息，如果不是有效的，msg返回具体的错误信息
 *
 */
function isValidateUser(user){
  var result = {
    isValidate: false,
    msg: ''
  }
  if (!validator.isLength(user.name, 4, 16)){
    result.msg = '用户名应该不少于4位字符且不大于16位字符！';
    return result;
  }
  if (!validator.isLength(user.password, 6, 32)){
    result.msg = '密码应该不少于6位字符且不大于32位字符！';
    return result;
  }
  if (!validator.isEmail(user.email)){
    result.msg = '请输入有效的email地址!';
    return result;
  }

  result.isValidat = true;
  return result;
}

/********************************************/

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthController)
   */
  _config: {
    actions: true, // 打开自动生成的CRUD方法
    rest: false    // 关闭自动生成的rest 路由
  },

  // TODO 注册后增加登陆session,新用户注册后即是登陆状态
  register: function(req, res){
    var name = req.param('name', ''),
        password = req.param('password', ''),
        email = req.param('email', '');
    var validateResult;
    var user = {
      name: name,
      password: password,
      email: email
    }

    // 验证用户输入的注册数据是否合法
    validateResult = isValidateUser(user);
    if (!validateResult.isValidat){
      return res.json(400, {error: validateResult.msg});
    }

    // 判断用户输入的用户名和email是否已经存在
    async.waterfall([
      function(callback){
        // 验证用户名是否存在
        UserService.isUserExist({name: name}, function(err, isExist){
          if (err) {
            callback(err, 500);
          }
          else if (isExist){
            callback("用户名已经存在！", 400);
          }
          else {
            callback(null, false);
          }
        });
      },
      function(arg1, callback){
        // 验证email是否存在
        UserService.isUserExist({email: email}, function(err, isExist){
          if (err) {
            callback(err, 500);
          }
          else if (isExist){
            callback("email已经存在！", 400);
          }
          else {
            callback(null, false);
          }
        });
      }
    ], function(err, results){
      // 只要有一个错误或者数据库查询错误返回给客服端
      if (err && results == 500){
        return res.json(500, {error: err});
      }
      else if(err) {
        return res.json(400, {error: err});
      }
      else {
        UserService.createUser(user, function(err, created){
          if (err){
            return res.json(500, {error: err});
          }
          return res.json(200, {});
        });
      }
    });
  },

  // 用户登陆函数，登陆成功就建立session
  login:function(req, res){
    var name = req.param('name', '');
    var password = req.param('password', '');

    var loginWhere = {
      name: name
    }
    if (!name){
      return res.json(400, {error: "请输入用户名！"});
    }
    if (!password){
      return res.json(400, {error: "请输入密码！"});
    }
    UserService.isUserExist(loginWhere, function(err, isExist, user){
      if (err){
        return res.json(500, {error: err});
      }
      else if (!isExist || !(user.validPassword(password))){
        return res.json(400, {error: "用户名或密码错误！"});
      }

      // 成功登陆的情况
      req.session.user = user;
      return res.json(200, {});

    })
  }
};

