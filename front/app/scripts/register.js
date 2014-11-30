var R = 20, CW = 200, CH = 200, OffsetX = 10, OffsetY = 10;
var cOffsetX, cOffsetY;
function CaculateNinePointLotion(diffX, diffY) {
  var Re = [];
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      var Point = {
        X: (OffsetX + col * diffX + ( col * 2 + 1) * R),
        Y: (OffsetY + row * diffY + (row * 2 + 1) * R)
      };
      Re.push(Point);
    }
  }
  return Re;
}
var PointLocationArr = [];
window.onload = function () {
  var c = document.getElementById("myCanvas");
  // CW = document.body.offsetWidth;
  cOffsetX = $(c).offset().left;
  cOffsetY = $(c).offset().top;
  c.width = CW;
  c.height = CH;
  var cxt = c.getContext("2d");
  //两个圆之间的外距离 就是说两个圆心的距离去除两个半径
  var X = (CW - 2 * OffsetX - R * 2 * 3) / 2;
  var Y = (CH - 2 * OffsetY - R * 2 * 3) / 2;
  PointLocationArr = CaculateNinePointLotion(X, Y);
  InitEvent(c, cxt);
  //CW=2*offsetX+R*2*3+2*X
  Draw(cxt, PointLocationArr, [],null);
}

function Draw(cxt, _PointLocationArr, _LinePointArr,touchPoint) {
  var c = document.getElementById("myCanvas");
  if (_LinePointArr.length > 0) {
    cxt.beginPath();
    for (var i = 0; i < _LinePointArr.length; i++) {
      var pointIndex = _LinePointArr[i];
      cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y);
    }
    cxt.lineWidth = 10;
    cxt.strokeStyle = "#fe90aa";
    cxt.stroke();
    cxt.closePath();
    if(touchPoint!=null)
    {
      var lastPointIndex=_LinePointArr[_LinePointArr.length-1];
      var lastPoint=_PointLocationArr[lastPointIndex];
      cxt.beginPath();
      cxt.moveTo(lastPoint.X,lastPoint.Y);
      cxt.lineTo(touchPoint.X - $(c).offset().left, touchPoint.Y - $(c).offset().top - 10);
      cxt.stroke();
      cxt.closePath();
    }
  }
  for (var i = 0; i < _PointLocationArr.length; i++) {
    var Point = _PointLocationArr[i];
    cxt.fillStyle = "#fe90aa";
    cxt.beginPath();
    cxt.arc(Point.X, Point.Y, R, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.fill();
    cxt.fillStyle = "#ffffff";
    cxt.beginPath();
    cxt.arc(Point.X, Point.Y, R - 3, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.fill();
    if(_LinePointArr.indexOf(i)>=0)
    {
      cxt.fillStyle = "#fe90aa";
      cxt.beginPath();
      cxt.arc(Point.X, Point.Y, R -16, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
    }

  }
}
function IsPointSelect(touches,LinePoint)
{
  var c = document.getElementById("myCanvas");
  for (var i = 0; i < PointLocationArr.length; i++) {
    var currentPoint = PointLocationArr[i];
    var xdiff = Math.abs(currentPoint.X - touches.pageX + $(c).offset().left);
    var ydiff = Math.abs(currentPoint.Y - touches.pageY + $(c).offset().top + 10);
    var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
    if (dir < R ) {
      if(LinePoint.indexOf(i) < 0){ LinePoint.push(i);}
      break;
    }
  }
}
function InitEvent(canvasContainer, cxt) {
  var LinePoint = [];
  canvasContainer.addEventListener("touchstart", function (e) {
    IsPointSelect(e.touches[0],LinePoint);
  }, false);
  canvasContainer.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var touches = e.touches[0];
    IsPointSelect(touches,LinePoint);
    cxt.clearRect(0,0,CW,CH);
    Draw(cxt,PointLocationArr,LinePoint,{X:touches.pageX,Y:touches.pageY});
  }, false);
  canvasContainer.addEventListener("touchend", function (e) {
    cxt.clearRect(0,0,CW,CH);
    Draw(cxt,PointLocationArr,LinePoint,null);
    $(".password").val(LinePoint.join(""));
    LinePoint=[];
  }, false);
}