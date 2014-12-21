/**
 * /api/services/UserService.js
 * 关于Users上的数据操作
 */

var uuid = require('uuid');

/**
 * 根据查询的条件获得一个用户
 * @param  {[type]}   where
 * @param  {Function} next
 * @return {[type]}
 */
exports.getOneUser = function(where, next){
  Users
    .findOne(where)
    .exec(function(err, user){
      if (err){
        sails.log.error(__filename + ":" + __line + " [获取用户数据失败]");
        sails.log.error(err);
      }
      next(err, user);
    });
};

/**
 * 根据查询条件确定一个用户是否存在
 * @param  {[type]}   where
 * @param  {Function} next 第一个参数是错误信息，
 *                         第二参数是用户是否存在，
 *                         如果用户存在，第三个参数返回用户
 * @return {Boolean}
 */
exports.isUserExist = function(where, next){
  sails.log.debug(where);
  UserService.getOneUser(where, function(err, user){
    if (user){
      next(err, true, user);
    } else {
      next(err, false);
    }
  });
}

/**
 * 用来创建用户
 * @param  {[type]}   user
 * @param  {Function} next
 * @return {[type]}
 */
exports.createUser = function(user, next){
  Users
    .create(user)
    .exec(function(err, created){
      if (err){
        sails.log.error(__filename + ":" + " [创建用户失败]");
        sails.log.error(err);
      }
      next(err, created);
    });
}

/**
 * 新建一个Token并保存下来，而且把token返回给调用者
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
exports.createToken = function(user, next) {
  // 使用uuid和user.id来产生token
  var token = uuid.v4({
    clockseq: (user.id % 0x3ffff)
  });

  // 开始查询一个UsersInfo是否存在，如果不存在就新建
  // 接着就把token更新到数据库里
  UsersInfo
    .find({user: user.id}, {user: user.id})
    .exec(function createUsersInfo(err, UsersInfo){
      if (err){
        next(err, null);
      }
      else {
        UsersInfo
          .update({user: user.id}, {token: token})
          .exec(function(err, UsersInfo){
            if (err){
              sails.log.error(__filename + ":" + " [新建token失败]");
              sails.log.error(err);
            }
            next(err, token);
          });
      }
    });
}