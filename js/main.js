import LogoMenu from './logoMenu.js';
import LogoMenuItem from './logoMenuItem.js';
import { toggleElement, createBigImage, resetComicArticleVisibility } from './helper.js';

// handle main logo
const aboutItem = new LogoMenuItem('about-item');
aboutItem.setAnimations();

const comicItem = new LogoMenuItem('comic-item');
comicItem.setAnimations();

const illustrationItem = new LogoMenuItem('illustration-item');
illustrationItem.setAnimations();

const logoMenu = new LogoMenu(aboutItem, comicItem, illustrationItem);
logoMenu.setAnimations();

// small logo
const smallLogos = document.querySelectorAll('.small-logo');
const homepageElem = document.querySelector('#homepage');

const closeBtn = document.querySelector('#main-header .close-btn');

smallLogos.forEach(logo => {
    logo.addEventListener('click', event => {
        // remove close-btn
        if (!closeBtn.classList.contains('hidden')) closeBtn.classList.add('hidden');

        // handle section change
        const targetID = event.currentTarget.id.split('-')[0];
        const originElem = document.querySelector(`#${targetID}`);
        
        // for comic
        if (targetID === 'comic') resetComicArticleVisibility()

        toggleElement(originElem);
        toggleElement(homepageElem);
        logoMenu.reset();
    });
});

// #main-header close-btn
closeBtn.addEventListener('click', event => {
    logoMenu.header.classList.toggle('to-left');
})

// section-header menu btn
const menuBtns = document.querySelectorAll('.menu-btn');

menuBtns.forEach(btn => {
    btn.addEventListener('click', event => {
        // show close-btn
        if (closeBtn.classList.contains('hidden')) closeBtn.classList.remove('hidden');

        logoMenu.header.classList.toggle('to-left');
    });
});

// comic-link
const comicMenu = document.querySelector('#comic-menu');
const comicPages = document.querySelectorAll('.comic-pages');
const comicLinks = document.querySelectorAll('.comic-link');

comicLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetElem = document.querySelector(event.currentTarget.hash);
        toggleElement(comicMenu);
        toggleElement(targetElem);
    });
});

// comic back link
comicPages.forEach(page => {
    const backLink = page.querySelector('.back-link');

    backLink.addEventListener('click', event => {
        toggleElement(page);
        toggleElement(comicMenu);
    });
});

// Big image
document.querySelectorAll('#illustration img, .comic-pages img').forEach(img => 
    img.addEventListener('click', createBigImage)
);

// lazy loading images
// https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
document.addEventListener('DOMContentLoaded', _ => {
    const lazyloadImgs = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyloadImgs.forEach(img => imageObserver.observe(img));
    } else {
        // fallback
        lazyloadImgs.forEach(img => img.src = img.dataset.src);
    }
});