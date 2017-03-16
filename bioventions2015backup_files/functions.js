// Contents of functions.js
;(function($) {
  'use strict';
  var $body = $('html, body'),
      content = $('#main').smoothState({
        prefetch: true,
        pageCacheSize: 4,
        // Runs when a link has been activated
        onStart: {
          duration: 500, // Duration of our animation
          render: function () {
            // toggleAnimationClass() is a public method
            // for restarting css animations with a class
            content.toggleAnimationClass('is-exiting');
            // Scroll user to the top
            $body.animate({
              scrollTop: 0
            });
          }
        },
        callback : function() {
            $.readyFn.execute();
        }
      }).data('smoothState');
      //.data('smoothState') makes public methods available
})(jQuery);