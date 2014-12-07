/**
* Desire.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    // 外键 创建欲望的用户
    user: {
      model: 'Users'
    },

    // 外键 指向欲望类型
    type: {
      model: 'DesireType'
    },

    // 外键 指向欲望的记录
    record: {
      model: 'DesireRecord'
    },

    // 被多少人标记星
    star: 'integer',
    // 标记是否结束
    isEnd: 'boolean'

  }
};

