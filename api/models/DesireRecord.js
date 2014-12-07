/**
* DesireRecord.js
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

    start_text: 'text',
    start_image: 'array',
    start_voice: 'array',
    start_video: 'array',

    end_text: 'text',
    end_image: 'array',
    end_voice: 'array',
    end_video: 'array',

    desire: {
      model: 'Desire'
    }
  }
};

