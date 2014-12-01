// register
$(function(){
  $('.register').css({
    'min-height': window.innerHeight + 'px'
  });

  var width = window.innerWidth * 0.7;
  if (width > 600){
    width = 600;
  }
  var drawPassword = new NinePointPassword({
    CW: width,
    CH: width * 1,
    OffsetX: width * 0.08,
    OffsetY: width * 0.08,
    R: width * 0.1,
    color: "#fe90aa",
    dom: $("#draw_password").get(0),
    callback: function(password){
      console.log(password);
    }
  });

  drawPassword.start();
});