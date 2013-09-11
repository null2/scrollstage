/* Scrollstage
 * null2 GmbH 2013
 */
(function(main) {
  function resize() {
    var windowWith = $(window).innerWidth();
    var windowHeight = $(window).innerHeight();
    var windowAspectRatio = windowWith / windowHeight;

    $('svg').each(function() {
      var $svg = $(this);
      var bBox = this.getBBox();
      var viewBox = this.viewBox.baseVal;
      var maxAspectRatio = bBox.width / viewBox.height;
      var minAspectRatio = viewBox.width / bBox.height;

      if (windowAspectRatio > maxAspectRatio) {
        $svg.attr({
          width: windowWith,
          height: windowWith / maxAspectRatio
        })
      } else if (windowAspectRatio < minAspectRatio) {
        $svg.attr({
          width: minAspectRatio * windowHeight,
          height: windowHeight
        })
      } else {
        $svg.attr({
          width: windowWith,
          height: windowHeight
        })
      }
    });
  }

  function loadScene(element, callback) {
    var $element = $(element);
    var name = $element.data('scene');

    $.ajax('scenes/' + name + '/drawing.svg', {
      dataType: 'html',
      success: function(data) {
        $element.html(data);

        $('body').append($('<script/>', { src: 'scenes/' + name + '/animation.js' }));

        callback();
      }
    });
  }

  main.scenes = {};
  main.init = function() {
    async.each($('[data-scene]'), loadScene, function(err) {
      resize();

      $('body').append($('<script/>', { src: 'js/skrollr.stylesheets.min.js' }));
      $('body').append($('<script/>', { src: 'js/skrollr.min.js' }));
      $('body').append($('<script/>', { src: 'js/skrollr.menu.min.js' }));
      $('body').append($('<script/>', { src: 'js/skrollr.ie.min.js' }));

      var s = skrollr.init({
        render: function(obj) {
          for (var name in main.scenes) {
             if (typeof main.scenes[name].render === 'function') {
               main.scenes[name].render(obj);
             }
          }
        }
      });
    });

    $(window).on('resize', resize);
  };
})(window.scrollstage = {});
