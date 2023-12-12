'use strict';

const Fetcher = (() => {

    const Slider = require('./slider.js'),
        Current = require('./current.js');

    const siteUrl = window.location.protocol+'//'+top.location.host.toString(),
        siteMain = document.getElementById('main'),
        historyArr = [],
        transitionClass = 'fader',
        spinnerHtml = '<div class="spinner"></div>',
        animationClass = 'active',
        animationTargetClass = 'overview__link',
        animationTime = 500,
    linkSelector = "a[href^='"+siteUrl+"'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#']";
    let lastURL;

    const init = () => {
        historyArr.push(window.location.href);

        _addInternalLinksListener(document);

        window.addEventListener("popstate",() => {
            historyArr.pop();
            lastURL = historyArr[historyArr.length - 1];

            if (historyArr.length >= 1) {
                _fetch(lastURL);
            } else {
                history.back();
            }
        });

        // add loading spinner once
        siteMain.insertAdjacentHTML('afterend', spinnerHtml);
    };

    const _addInternalLinksListener = (el) => {
        const internalLinks = el.querySelectorAll(linkSelector);

        internalLinks.forEach((el)  => {
            el.addEventListener('click', (e) => {
                e.preventDefault();

                const url = siteUrl+el.getAttribute('href');

                // @todo: put animation stuff into external module?
                if (el.classList.contains(animationTargetClass)){
                    el.classList.add(animationClass);
                    setTimeout(() => {
                        _clickFetch(url);
                    }, animationTime);
                    return;
                }

                _clickFetch(url);
            });
        });
    };

    const _reinitMain = (main)  => {
        _addInternalLinksListener(main);

        Slider.init();

        siteMain.classList.remove(transitionClass);
    };

    const _clickFetch = (url)  => {
        if (url === window.location.href) {
            return;
        }

        _fetch(url, true);
    };

    const _fetch = (url, addHistory) => {
        siteMain.classList.add(transitionClass);

        fetch(url)
            .then(dataWrappedByPromise => dataWrappedByPromise.text())
            .then(data => {
                if (addHistory) {
                    historyArr.push(url);
                }
                history.pushState(null, null, url);

                // @todo: error when getContent results in catch here! even if not offline issue
                _getContent(data);
            }).catch(error => {
                let offlineUrl = siteUrl+'/offline/';
                window.location.replace(offlineUrl);
                //siteMain.classList.remove(transitionClass);
                console.error('Error:', error)
            }
        );
    };

    const _getContent = (html) => {
        let parser = new DOMParser(),
            content = parser.parseFromString(html, "text/html"),
            newMain = content.querySelector('#main').innerHTML,
            newTitle = content.querySelector('title').innerHTML,
            newCurrentMainNavID = content.querySelector('[data-main-current]');

        if (newCurrentMainNavID !== null) {
            newCurrentMainNavID = newCurrentMainNavID.getAttribute('data-main-current');
        }
        Current.menu(newCurrentMainNavID, 'data-main-id');

        Current.isHome();

        siteMain.innerHTML = '';
        siteMain.insertAdjacentHTML('afterbegin', newMain);
        document.querySelector('title').innerHTML = newTitle;

        _reinitMain(siteMain);
    };

    return {
        init
    };
})();

Fetcher.init();
