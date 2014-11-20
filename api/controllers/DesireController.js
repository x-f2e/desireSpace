/**
 * DesireController
 *
 * @description :: Server-side logic for managing desires
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(request, response) {
    if (typeof request.session.userCount == 'undefined'){
      request.session.userCount = 0;
    }
    else{
      request.session.userCount += 1;
    }
    response.cookie("userCount", request.session.userCount);
    response.send("xxoo");
  },

  show: function(request, response) {
    response.send("show xxoo");
  }
};

