!function($){"use strict";var t=$("html, body"),a=$("#main").smoothState({prefetch:!0,pageCacheSize:4,onStart:{duration:250,render:function(e,o){a.toggleAnimationClass("is-exiting"),t.animate({scrollTop:0})}}}).data("smoothState")}(jQuery);