(function($){
  $(function(){

    var window_width = $(window).width();

    // convert rgb to hex value string
    function rgb2hex(rgb) {
      if (/^#[0-9A-F]{6}$/i.test(rgb)) { return rgb; }

      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      function hex(x) {
          return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    $('.dynamic-color .col').each(function () {
      $(this).children().each(function () {
        var color = $(this).css('background-color'),
            classes = $(this).attr('class');
        $(this).html(rgb2hex(color) + " " + classes);
        if (classes.indexOf("darken") >= 0) {
          $(this).css('color', 'rgba(255,255,255,.9');
        }
      });
    });


    // Floating-Fixed table of contents
    if ($('.table-of-contents').length) {
      var toc_offset = $('.table-of-contents').first().offset().top;
      $('.table-of-contents').each(function() {
        var origin = $(this);
        origin.pushpin({ top: toc_offset,
          bottom: $(document).height() - window.innerHeight });
      });
    }


    // Tabs Fixed
    if ($('.tabs-wrapper').length) {
      $('.tabs-wrapper .row').pushpin({ top: $('.tabs-wrapper').offset().top });
    }



    // Detect touch screen and enable scrollbar if necessary
    function is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }
    if (is_touch_device()) {
      $('#nav-mobile').css({ overflow: 'auto'})
    }


    // Plugin initialization
    $('.slider').slider({full_width: true});
    $('.dropdown-button').dropdown({hover: false});
    if (window_width > 600) {
      $('ul.tabs').tabs();
    }
    else {
      $('ul.tabs').hide();
    }
    $('.tab-demo').show().tabs();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('.tooltipped').tooltip({"delay": 300});
    $('.collapsible-accordion').collapsible();
    
    $('.collapsible-expandable').collapsible({"accordion": false});
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.button-collapse').sideNav({'menuWidth': 400, activationWidth: 70});
    $('.datepicker').pickadate();
    $('select').not('.disabled').material_select();


  }); // end of document ready
})(jQuery); // end of jQuery name space
