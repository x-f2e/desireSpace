module.exports = function(request, response, next) {
  if (request.session.userCount > 6){
    next();
  }
  else{
    response.send("xxoo");
  }
}