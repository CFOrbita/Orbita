
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
