// change section functions
function toggleElement(elem) {
    if (elem.classList.contains('hidden')) {
        fade(elem, .05, 0, 1);
        elem.classList.remove('hidden');
    } else {
        //fade(elem, .08, 1, 0.001);
        elem.classList.add('hidden');
    }
}

export function changeSection(event) {
    let hash = window.location.hash;

    if (!hash) hash = '#homepage';

    const activeSectionId = hash.slice(1);

    document.querySelectorAll('section').forEach(section => {
        // hide/show section
        if (!section.classList.contains('hidden') ||
            section.id === activeSectionId) {
            toggleElement(section);
        }
    })

    return activeSectionId;
}

// animation functions
export function fade(elem, rate, start, end, remove = false) {
    let opacity = start;
    elem.style.opacity = opacity;

    const transform = _ => {
        opacity += rate;
        elem.style.opacity = opacity;

        if ((Math.sign(rate) === -1 && opacity <= end) ||
            (Math.sign(rate) === 1 && opacity >= end)) {
            if (remove) document.body.removeChild(elem);
            return;
        }

        window.requestAnimationFrame(transform);
    };

    window.requestAnimationFrame(transform)
}

// big image functions
function createBigImage(parent, event) {
    // create and add overlay
    const overlay = document.createElement('div');
    overlay.classList.add('big-img-overlay');
    parent.appendChild(overlay);

    // generate big image src
    const src = event.target.src

    // create and add big-image
    const bigImage = document.createElement('img');
    bigImage.classList.add('big-img');
    bigImage.src = src;
    parent.appendChild(bigImage);

    // animations
    fade(bigImage, .08, 0, 1);
    fade(overlay, .08, 0, 1);

    return [bigImage, overlay];
}

export function removeBigImage(parent) {
    // remove overlay and big-image
    const overlay = document.querySelector(`${parent.nodeName} > .big-img-overlay`);
    parent.removeChild(overlay);

    const bigImage = document.querySelector(`${parent.nodeName} > .big-img`);
    parent.removeChild(bigImage);
}

export function createBigImageGallery(parent, event, imgNumber) {
    // the gallery is close with the back button both in desktop and mobile
    const imgGalleryViewer = document.querySelector('#img-gallery-viewer');

    // src manipulation methods
    const getNewSrc = (newSrcNum, src) => {
        return src.replace(/(\d+).(jpg|png)/, `${newSrcNum}.$2`);
    };

    const getSrcNum = src => Number(src.match(/(\d+).(jpg|png)/)[1]);

    // navigation methods
    const goLeft = _ => {
        const bigImg = document.querySelector('.big-img');
        const srcNum = getSrcNum(bigImg.src);
    
        if (srcNum > 1) bigImg.src = getNewSrc(srcNum - 1, bigImg.src);
        else history.back();
    }

    const goRight = _ => {
        const bigImg = document.querySelector('.big-img');
        const srcNum = getSrcNum(bigImg.src);

        if (srcNum < bigImg.dataset.imgNumber) bigImg.src = getNewSrc(srcNum + 1, bigImg.src);
        else history.back();
    }

    const exitGallery = _ => history.back();

    // remove previous big-img
    if (imgGalleryViewer.querySelector('img')) {
        removeBigImage(imgGalleryViewer);
    } else {
        // set buttons bindings only once
        document.querySelector('#left-btn').addEventListener('click', goLeft);
        document.querySelector('#right-btn').addEventListener('click', goRight);
        document.querySelector('#exit-btn').addEventListener('click', exitGallery);

        handleTouch(goLeft, document.querySelector('#left-btn'));
        handleTouch(goRight, document.querySelector('#right-btn'));
        handleTouch(exitGallery, document.querySelector('#exit-btn'));

        document.addEventListener('keyup', event => {
            if (event.key === 'ArrowRight') goRight();
            if (event.key === 'ArrowLeft') goLeft();
            if (event.key === 'Escape') exitGallery();
        })
        handleSwipe(goLeft, goRight);
    }

    const bigImage = createBigImage(parent, event)[0];
    bigImage.dataset.imgNumber = imgNumber; // for #right-btn click handler

    // bindings
    bigImage.addEventListener('click', event => {
        const srcNum = getSrcNum(event.target.src);
        const halfWidth = window.innerWidth / 2;

        if (event.clientX > halfWidth && srcNum < imgNumber) {
            bigImage.src = getNewSrc(srcNum + 1, bigImage.src);
        } else if (event.clientX < halfWidth && srcNum > 1) {
            bigImage.src = getNewSrc(srcNum - 1, bigImage.src);
        } else {
            history.back();
        }
    });
}

export function placeholderSrc(width, height) {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;
}

// lazy load images
// https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
export function lazyLoadImages(images, options) {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        }, options);

        images.forEach(img => imageObserver.observe(img));
    } else {
        // fallback
        images.forEach(img => img.src = img.dataset.src);
    }
}

function handleSwipe (leftFn, rightFn, elem = document.body) {
    let touchStartX = 0;
    let touchEndX = 0;

    elem.addEventListener('touchstart', event => {
        touchStartX = event.changedTouches[0].screenX;
    });
    
    elem.addEventListener('touchend', event => {
        touchEndX = event.changedTouches[0].screenX;

        if (Math.abs(touchStartX - touchEndX) < 40) return;
        else if (touchStartX > touchEndX) rightFn();
        else if (touchStartX < touchEndX) leftFn();
    });
}

function handleTouch (fn, elem = document.body) {
    let touchStartX = 0;
    let touchEndX = 0;

    elem.addEventListener('touchstart', event => {
        touchStartX = event.changedTouches[0].screenX;
    });
    
    elem.addEventListener('touchend', event => {
        event.preventDefault();
        touchEndX = event.changedTouches[0].screenX;

        if (Math.abs(touchStartX - touchEndX) < 40) fn();
    });
}