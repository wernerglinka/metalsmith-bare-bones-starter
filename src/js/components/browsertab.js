'use strict';

const faviconSelector = document.querySelector('link[rel="shortcut icon"]');
window.onblur = () => {
    faviconSelector.href = '/favicon-inv.ico';
};
window.onfocus = () => {
    faviconSelector.href = '/favicon.ico';
}
