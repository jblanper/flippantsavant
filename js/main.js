import LogoMenu from './logoMenu.js';
import LogoMenuItem from './logoMenuItem.js';
import { createTemporalBigImage, createBigImageGallery, placeholderSrc, lazyLoadImages, changeSection, fade } from './helper.js';

// handle main logo ---------------------------------------------------------------------------
const aboutItem = new LogoMenuItem('about-item');
aboutItem.setAnimations();

const comicItem = new LogoMenuItem('comic-item');
comicItem.setAnimations();

const illustrationItem = new LogoMenuItem('illustration-item');
illustrationItem.setAnimations();

const logoMenu = new LogoMenu(aboutItem, comicItem, illustrationItem);
logoMenu.setAnimations();

// lazy loading images ------------------------------------------------------------------------
const illustrationImages = document.querySelectorAll('#illustration-article img[data-src]');
const verminImages = document.querySelectorAll('#vermin-comic img[data-src]');

// set place holders while images load
illustrationImages.forEach(img => img.src = placeholderSrc(400, 400));
verminImages.forEach(img => img.src = placeholderSrc(600, 800));

// intersectionObserver options
const illustrationOptions = {
    root: document.querySelector('#illustration-article'),
    rootMargin: '0px 0px 100px 0px'
};

const verminOptions = {
    root: document.querySelector('#vermin-comic'),
    rootMargin: '0px 0px 100px 0px'
};

lazyLoadImages(illustrationImages, illustrationOptions);
lazyLoadImages(verminImages, verminOptions);

// Bindings -----------------------------------------------------------------------------------
// general bindings
window.addEventListener("hashchange", changeSection);

// #main-header close-btn binding
const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', event => {
    logoMenu.header.classList.add('to-left');
});

// section-header small-logo binding
document.querySelectorAll('.small-logo').forEach(btn =>
    btn.addEventListener('click', event => {
        closeBtn.style.display = 'none';
        logoMenu.reset();
    })
);

// section-header menu btn binding
document.querySelectorAll('.menu-btn').forEach(btn =>
    btn.addEventListener('click', event => {
        closeBtn.style.display = 'block';
        logoMenu.header.classList.remove('to-left');
    })
);

// illustration images binding (not vermin-comic)
document.querySelectorAll('#illustration img, #predator-comic img, #alien-comic img').forEach(img =>
    img.addEventListener('click', event => createTemporalBigImage(document.body, event))
);

window.onload = _ => history.pushState("", document.title, window.location.pathname);

// vermin comic gallery fullscreen
document.querySelectorAll('#vermin-comic img').forEach(img => {
    const imgGalleryViewer = document.querySelector('#img-gallery-viewer');
    
    img.addEventListener('click', event => {
        window.location.hash = '#img-gallery-viewer';
        createBigImageGallery(imgGalleryViewer, event, 12);
        fade(document.querySelector('.instructions'), -.008, 1, .001);
    });
});
