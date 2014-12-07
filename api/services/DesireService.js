var async = require("async");

/**
 * [createDesire description]
 * @param  {[type]}   desire       [description]
 * @param  {[type]}   desireRecord [description]
 * @param  {Function} next         [description]
 * @return {[type]}                [description]
 */
exports.createDesire = function(desire, desireRecord, next) {
  async.waterfall([
      // 先创建一个新的Desire，并得到id
      function(cb){
        Desire.create(desire)
          .exec(function(err, created){
            cb(err, created.id);
          });
      },
      // 使用新建的Desire的id, 新建一个DesireRecord
      function(desireId, cb){
        desireRecord.desire = desireId;
        DesireRecord.create(desireRecord)
          .exec(function(err, created){
            cb(err, desireId, created.id);
          })
      },
      // 把新建的DesireRecord的id更新到Desire里
      function(desireId, desireRecordId, cb){
        Desire.update(
          {id: desireId},
          {record: desireRecordId})
        .exec(function(err, updated){
          cb(err, updated);
        });
      }
    ], function(err, results){
      if (err){
        sails.log.error(__filename + ":" + " [创建欲望失败]");
        sails.log.error(err);
      }
      next(err, results);
    });
}