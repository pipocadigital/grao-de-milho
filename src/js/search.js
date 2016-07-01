var $containerSearch  = $('.search--js'),
    $btnSearch        = $('.button-search--js');


$btnSearch.on('click', function(){

  $containerSearch.slideToggle();
  $containerSearch.find('input').focus();

  $(this).find('.fa').toggleClass('fa-search fa-times');

});
