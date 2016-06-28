"use strict";

var buttonMenu  = document.getElementById('btn-menu'),
    body    = document.body;

if(buttonMenu){
  buttonMenu.addEventListener('click', function (e) {
    e.preventDefault();
    body.classList.toggle('menu-open');
  });
}
