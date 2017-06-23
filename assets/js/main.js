function macyInit(){
  Macy.init({
    container: '#macy-container',
    trueOrder: false,
    waitForImages: false,
    margin: 27,
    columns: 3,
    breakAt: {
        1280: 2,
        720: 1
    }
  });
}

// barba.js
var tiledView = Barba.BaseView.extend({
  namespace: 'tiledview',
  onEnterCompleted: function() {
      macyInit();
  },
});

tiledView.init();

Barba.Dispatcher.on('linkClicked', function(el) {
  $('.active').removeClass('active');
  el.parentElement.className += " active";
});

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    return $(this.oldContainer).hide().promise();
  },

  fadeIn: function() {
    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();
    $el.css({
      position : 'relative',
      zIndex: 2
    });

    if ($(window).width() < 981){
      $el.addClass('animated fadeInUp');
    }else{
      $el.addClass('animated fadeInDown');
    }
    _this.done();
  }
});

Barba.Pjax.getTransition = function() {
  return FadeTransition;
};

function setActive(){
  var page = window.location.href.replace('http://axelvaldez.mx/', '');
  if(page == ''){
    page = '.work';
  }else{
    page = '.' + page.replace('/','');
  }
  $(page).addClass('active');
}

// document ready
$(function(){
  macyInit();
  Barba.Pjax.start();
  setActive();
});
