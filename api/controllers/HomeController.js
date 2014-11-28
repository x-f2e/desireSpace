/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res){
    if (req.session.user){
      return res.json(200, {error: "is login"});
    }
    else {
      return res.json(200, {error: "not login"});
    }

  }
};

