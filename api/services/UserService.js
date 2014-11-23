/**
 * /api/services/UserService.js
 * 关于Users上的数据操作
 */


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
        sails.log.error(error);
      }

      next(err, user);
    });
};

/**
 * 根据查询条件确定一个用户是否存在
 * @param  {[type]}   where
 * @param  {Function} next
 * @return {Boolean}
 */
exports.isUserExist = function(where, next){
  sails.log.debug(where);
  UserService.getOneUser(where, function(err, user){
    if (user){
      next(err, true);
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
        sails.log.error(__filename + ":" + __line + " [创建用户失败]");
        sails.log.error(error);
      }
      next(err, created);
    });
}

