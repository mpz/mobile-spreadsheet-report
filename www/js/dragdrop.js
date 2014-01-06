
// toch on mobile
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

// simple drag and drop
(function($){
  $.fn.drag = function(o){
    var o = $.extend({
      start:function(){},   // при начале перетаскивания
      stop:function(){} // при завершении перетаскивания
    }, o);
    return $(this).each(function(){
      var d = $(this); // получаем текущий элемент
      d.mousedown(function(e){ // при удерживании мыши
        d.css('position','absolute');
        $(document).unbind('mouseup'); // очищаем событие при отпускании мыши
        o.start(d); // выполнение пользовательской функции
        var f = d.offset(), // находим позицию курсора относительно элемента
        x = e.pageX - f.left,  // слева
        y = e.pageY - f.top;  // и сверху

          $(document).mousemove(function(a){ // при перемещении мыши
          d.css({'top' : a.pageY - y + 'px','left' : a.pageX - x + 'px'}); // двигаем блок
        });
        $(document).mouseup(function(){  // когда мышь отпущена
          $(document).unbind('mousemove'); // убираем событие при перемещении мыши
          o.stop(d); // выполнение пользовательской функции
        });
        return false;
      });
    });
  }
})(jQuery);


function refresh_drag_events(){
  $(".draggable").draggable();
  $('#ball3').drag();
}

//  ========================================

