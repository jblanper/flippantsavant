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

    // remove previous big-img
    if (imgGalleryViewer.querySelector('img')) {
        removeBigImage(imgGalleryViewer);
    }

    const changeSrc = (newSrcNum) => {
        bigImage.src = bigImage.src.replace(/(\d+).(jpg|png)/, `${newSrcNum}.$2`);
    };

    const getSrcNum = event => Number(event.target.src.match(/(\d+).(jpg|png)/)[1]);

    const bigImage = createBigImage(parent, event)[0];

    // bindings
    bigImage.addEventListener('click', event => {
        const srcNum = getSrcNum(event);
        const halfWidth = window.innerWidth / 2;

        if (event.clientX > halfWidth && srcNum < imgNumber) {
            changeSrc(srcNum + 1);
        } else if (event.clientX < halfWidth && srcNum > 1) {
            changeSrc(srcNum - 1);
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