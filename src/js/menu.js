"use strict";

var $buttonMenu  = $( '.btn-menu--js' ),
    $menuItem  = $( '.menu-item' ),
    $body    = $( 'body' );

if( $buttonMenu.length ){

  $body.on('click', function() {
    $menuItem.removeClass( 'active' );
  });

  $buttonMenu.on( 'click', function ( e ) {
    e.preventDefault();
    $body.toggleClass( 'menu-open' );
  });

  $menuItem.on('click', function( e ){
    var haveSubMenu = false;
    // Verify if the element clicked has submenu
    if(e.target != this ) {
      e.stopPropagation();
      haveSubMenu = ( $(this).find('.sub-menu').length != 0 );
      console.log( haveSubMenu );
    }
    // Prevent location with in mobile
    if( window.innerWidth < 800 && haveSubMenu) {
      e.preventDefault();
    }
    $(this).toggleClass( 'active' );
  });
}
