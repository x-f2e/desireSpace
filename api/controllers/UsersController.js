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
    // TODO: 应该把验证流程改的更清晰
    async.series(
      {
        name: function(callback){
          UserService.isUserExist({name: name}, callback);
        },
        email: function(callback){
          UserService.isUserExist({email: email}, callback);
        }
      },

      function(err, results){
        if (err){
          return res.json(500, {error: err});
        } else {
          var errString = '',
              statusCode = 200;
          if (results.name) {
            errString += '用户名已经存在！';
          }
          if (results.email) {
            errString += 'email已经存在！';
          }

          if (errString){
            return res.json(statusCode, {error: errString});
          }
          UserService.createUser(user, function(err, created){
            if (err){
              return res.json(500, {error: err});
            }
            return res.json(200, {});
          });
        }
      }
    );
  }
};

