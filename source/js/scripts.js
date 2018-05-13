
/*Для слайд меню*/
$(document).ready(function() {

  var $toggleButton = $('.toggle-button'),
    $menuWrap = $('.menu-wrap'),
    $sidebarArrow = $('.sidebar-menu-arrow');

  // Hamburger button

  $toggleButton.on('click', function() {
    $(this).toggleClass('button-open');
    $menuWrap.toggleClass('menu-show');
  });

  // Sidebar navigation arrows

  $sidebarArrow.click(function() {
    $(this).next().slideToggle(300);
  });

});

//////

/*Для header-user*/

$('.header-user__arrow').click(function(e) {
  var $block = $('.header-user__menu');

  if ($block.css('display') != 'block') {
    $block.show(200);

    var firstClick = true;
    $(document).bind('click.myEvent', function(e) {
      if (!firstClick && $(e.target).closest('.header-user__menu').length == 0) {
        $block.hide(150);
        $(document).unbind('click.myEvent');
      }
      firstClick = false;
    });
  }
  e.preventDefault();
});

///////////////


// Для логина
$(function() {
  $(".input input").focus(function() {
    $(this).parent(".input").each(function() {
      $("label", this).css({
        "line-height": "18px",
        "font-size": "18px",
        "font-weight": "100",
        "top": "0px"
      })
      $(".spin", this).css({
        "width": "100%"
      })
    });
  }).blur(function() {
    $(".spin").css({
      "width": "0px"
    })
    if ($(this).val() == "") {
      $(this).parent(".input").each(function() {
        $("label", this).css({
          "line-height": "60px",
          "font-size": "24px",
          "font-weight": "600",
          "top": "10px"
        })
      });

    }
  });

  $(".alt-2").click(function() {
    if (!$(this).hasClass('material-button')) {
      $(".shape").css({
        "width": "100%",
        "height": "100%",
        "transform": "rotate(0deg)"
      })
      setTimeout(function() {
        $(".overbox").css({
          "overflow": "initial"
        })
      }, 600)

      $(this).animate({
        "width": "70px",
        "height": "70px"
      }, 500, function() {
        $(".box").removeClass("back");

        $(this).removeClass('active')
      });
      $(".overbox .title").fadeOut(300);
      $(".overbox .input").fadeOut(300);
      $(".overbox .button").fadeOut(300);

      $(".alt-2").addClass('material-buton');
    }
  })

  $(".material-button").click(function() {

    if ($(this).hasClass('material-button')) {
      setTimeout(function() {
        $(".overbox").css({
          "overflow": "hidden"
        })
        $(".box").addClass("back");
      }, 200)
      $(this).addClass('active').animate({
        "width": "700px",
        "height": "900px"
      });

      setTimeout(function() {
        $(".shape").css({
          "width": "50%",
          "height": "50%",
          "transform": "rotate(45deg)"
        })

        $(".overbox .title").fadeIn(300);
        $(".overbox .input").fadeIn(300);
        $(".overbox .button").fadeIn(300);
      }, 700)

      $(this).removeClass('material-button');
    }

    if ($(".alt-2").hasClass('material-buton')) {
      $(".alt-2").removeClass('material-buton');
      $(".alt-2").addClass('material-button');
    }
  });

  $(".reg").click(function() {
    $(".material-button").click()
  })

});
//
