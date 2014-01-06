$.fn.draggable = function() {
  var offset = null;
  var start = function(e) {
    var orig = e.originalEvent;
    var pos = $(this).position();
    offset = {
      x: orig.changedTouches[0].pageX - pos.left,
      y: orig.changedTouches[0].pageY - pos.top
    };
  };
  var moveMe = function(e) {
    e.preventDefault();
    var orig = e.originalEvent;
    $(this).css({
      top: orig.changedTouches[0].pageY - offset.y,
      left: orig.changedTouches[0].pageX - offset.x
    });
  };
  this.bind("touchstart", start);
  this.bind("touchmove", moveMe);
};

$(".draggable").draggable();


//  ========================================


var ball = document.getElementById('ball3');


function fixEvent(e) {
  e = e || window.event;

  if (!e.target) e.target = e.srcElement;

  if (e.pageX == null && e.clientX != null ) { // если нет pageX..
    var html = document.documentElement;
    var body = document.body;

    e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
    e.pageX -= html.clientLeft || 0;

    e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
    e.pageY -= html.clientTop || 0;
  }

  if (!e.which && e.button) {
    e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
  }

  return e;
}


function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}



ball.onmousedown = function(e) {
  var self = this;
  e = fixEvent(e);

  var coords = getCoords(this);

  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;


  this.style.position = 'absolute';
  document.body.appendChild(this);
  moveAt(e);

  this.style.zIndex = 1000; // над другими элементами

  function moveAt(e) {
    self.style.left = e.pageX - shiftX + 'px';
    self.style.top = e.pageY - shiftY+ 'px';
  }

  document.onmousemove = function(e) {
    e = fixEvent(e);
    moveAt(e); 
  };

  this.onmouseup = function() {
    document.onmousemove = self.onmouseup = null;
  };

}

        ball.ondragstart = function() { 
          return false; 
        };
