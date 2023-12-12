'use strict';

// check for mouse activity to detect touch device
const MOUSE_OVER = 'mouseover';
window.addEventListener(MOUSE_OVER, function onFirstPointer(e) {
    window.POINTER_SIZE = e.height;
    document.body.classList.add('mouseDevice');
    window.removeEventListener(MOUSE_OVER, onFirstPointer, false);
}, false);

//require('./components');
require('./components/fetcher.js');
require('./components/slider.js');
require('./components/browsertab.js');

// import style from "../scss/style.scss"; is already set in webpack config

console.log('Hi,\nnice you visit my log. 😁\nThis site trys to be a SPA.\nIt\'s a PHP rendered CMS site for SEO reasons but loads content in a native way.\nNo struggle with getting a JSON Data Layer or configuring these templates.\nHTML content is loaded via your browsers fetch API');
