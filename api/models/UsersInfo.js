/**
* UsersInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    // 外键 创建欲望的用户
    user: {
      model: 'Users'
    },

    // 用户的性别，true是男, false是女，空是其他
    gender: 'boolean',

    // 用户登陆后存放在客户端的token
    token: 'string',

    // 用户的昵称
    nick: 'string',

    // 用户的头像小号 一个url
    small_portrait: 'string',

    // 用户的头像中号
    middle_portrait: 'string',

    // 用户的头像最大 (^_^like me)
    big_portrait: 'string',

    // 自我介绍
    introduce: 'string'
  }
};

