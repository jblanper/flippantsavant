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
    const hash = window.location.hash;
    const activeSectionId = hash.slice(1);

    // hide close btn of main menu in homepage
    if (activeSectionId === 'homepage') {
        const closeBtn = document.querySelector('#main-header .close-btn');
        closeBtn.style.display = 'none';
    }

    document.querySelectorAll('section').forEach(section => {
        // hide/show section
        if (!section.classList.contains('hidden') ||
            section.id === activeSectionId) {
            toggleElement(section);
        }
    })
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
    fade(overlay, .08, 0, .5);
    fade(bigImage, .08, 0, 1);

    return [bigImage, overlay];
}

export function createTemporalBigImage(parent, event) {
    const [bigImage, overlay] = createBigImage(parent, event);

    // create instructions pop up
    const instructions = document.createElement('div');
    instructions.classList.add('instructions');
    const p = document.createElement('p');
    p.innerHTML = 'click to exit'
    parent.appendChild(instructions);
    instructions.appendChild(p);

    // remove instructions slowly
    fade(instructions, -.01, 1, .001, true);

    // click on image to remove it
    bigImage.addEventListener('click', _ => removeBigImage(parent));
    overlay.addEventListener('click', _ => removeBigImage(parent));
}

function removeBigImage(parent) {
    // remove overlay and big-image
    const overlay = document.querySelector(`${parent.nodeName} > .big-img-overlay`);
    parent.removeChild(overlay);

    const bigImage = document.querySelector(`${parent.nodeName} > .big-img`);
    parent.removeChild(bigImage);
}

export function createBigImageGallery(parent, event, imgNumber) {
    // the gallery is close with the back button both in desktop and mobile
    let bigImage = parent.querySelector('img');

    const changeSrc = (newSrcNum) => {
        bigImage.src = bigImage.src.replace(/\d+.jpg/, `${newSrcNum}.jpg`);
    };

    // in case there is already an image
    if (bigImage) {
        changeSrc(1);
        return;
    } else {
        bigImage = createBigImage(parent, event)[0];
    }

    // bindings
    document.querySelector('#img-gallery-viewer').addEventListener('click', event => {
        const srcNum = Number(bigImage.src.match(/(\d+).jpg/)[1]);
        const halfWidth = window.innerWidth / 2;

        if (event.clientX > halfWidth && srcNum < imgNumber) {
            changeSrc(srcNum + 1);
        } else if (event.clientX < halfWidth && srcNum > 1) {
            changeSrc(srcNum - 1);
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