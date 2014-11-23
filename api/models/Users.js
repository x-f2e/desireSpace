/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require("bcrypt");


/**
 * Generic password hash function.
 *
 * @param   {sails.model.Users}  user
 * @param   {Function}           next
 */
function hashPassword(user, next) {
    bcrypt.hash(user.password, 10, function(error, hash) {
        if (error) {
            sails.log.error(__filename + ":" + __line + " [Password hashing failed]");
            sails.log.error(error);

            return next(error);
        }

        user.password = hash;

        return next();
    });
}

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },

    // Override toJSON instance method to remove password value
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;

      return obj;
    },

    // Validate password
    validPassword: function(password, callback) {
      var obj = this.toObject();

      if (callback) {
        return bcrypt.compare(password, obj.password, callback);
      } else {
        return bcrypt.compareSync(password, obj.password);
      }
    }

  },

  // Life cycle callbacks

  /**
   * Before create callback.
   *
   * @param   {sails.model.users}  user
   * @param   {Function}          next
   */
  beforeCreate: function(user, next) {
    hashPassword(user, next);
  },
};

