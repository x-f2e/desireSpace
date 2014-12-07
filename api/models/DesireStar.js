/**
* DesireStar.js
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

    // 用户
    user: {
      model: 'Users'
    },

    // 被标记的欲望
    desire: {
      model: 'Desire'
    }
  }
};

