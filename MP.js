//////// whatsapp chat icon ////////
(function($) {
  var wa_time_out, wa_time_in;
  $(document).ready(function() {
    $(".wa__btn_popup").on("click", function() {
      if ($(".wa__popup_chat_box").hasClass("wa__active")) {
        $(".wa__popup_chat_box").removeClass("wa__active");
        $(".wa__btn_popup").removeClass("wa__active");
        clearTimeout(wa_time_in);
        if ($(".wa__popup_chat_box").hasClass("wa__lauch")) {
          wa_time_out = setTimeout(function() {
            $(".wa__popup_chat_box").removeClass("wa__pending");
            $(".wa__popup_chat_box").removeClass("wa__lauch");
          }, 400);
        }
      } else {
        $(".wa__popup_chat_box").addClass("wa__pending");
        $(".wa__popup_chat_box").addClass("wa__active");
        $(".wa__btn_popup").addClass("wa__active");
        clearTimeout(wa_time_out);
        if (!$(".wa__popup_chat_box").hasClass("wa__lauch")) {
          wa_time_in = setTimeout(function() {
            $(".wa__popup_chat_box").addClass("wa__lauch");
          }, 100);
        }
      }
    });

    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    $("#nta-wa-gdpr").change(function() {
      if (this.checked) {
        setCookie("nta-wa-gdpr", "accept", 30);
        if (getCookie("nta-wa-gdpr") != "") {
          $('.nta-wa-gdpr').hide(500);
          $('.wa__popup_content_item').each(function(){
            $(this).removeClass('pointer-disable');
            $('.wa__popup_content_list').off('click');
          })
        }
      }
    });

    if (getCookie("nta-wa-gdpr") != "") {
      $('.wa__popup_content_list').off('click');
    } else{
      $('.wa__popup_content_list').click(function(){
        $('.nta-wa-gdpr').delay(500).css({"background" : "red", "color" : "#fff"});
      });
    }
  });
})(jQuery);

// Pop Up Image
let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

 
