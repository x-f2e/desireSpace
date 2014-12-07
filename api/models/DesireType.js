/**
* DesireType.js
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
    // 欲望类型的名字，不能重复
    name: {
      type: 'string',
      unique: true
    },
    // 统计某种类型的欲望产生的次数
    count: {
      type: 'integer',
      defaultsTo: 1
    }
  },
};

