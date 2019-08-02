function toggleElement(elem) {
    if (elem.classList.contains('hidden')) {
        fade(elem, .05, 0, 1);
        elem.classList.remove('hidden');
    } else {
        elem.classList.add('hidden');
    }
}

export function changeSection(event) {
    const hash = window.location.hash;
    const activeSectionId = hash.slice(1);

    // hide close btn of main menu in homepage
    if (activeSectionId === 'homepage') {
        const closeBtn = document.querySelector('#main-header .close-btn');
        closeBtn.classList.add('hidden');
    }

    document.querySelectorAll('section').forEach(section => {
        // hide/show section
        if (!section.classList.contains('hidden') ||
            section.id === activeSectionId) {
            toggleElement(section);
        }
    })
}

function fade(elem, rate, start, end) {
    let opacity = start;
    elem.style.opacity = opacity;

    const transform = _ => {
        opacity += rate;
        elem.style.opacity = opacity;

        if (Math.sign(rate) === -1 && opacity <= end || opacity >= end) return;

        window.requestAnimationFrame(transform);
    };

    window.requestAnimationFrame(transform)
}

// big image functions
export function createBigImage(event) {
    // create and add overlay
    const overlay = document.createElement('div');
    overlay.classList.add('big-img-overlay');
    document.body.appendChild(overlay);

    // generate big image src
    const src = event.target.src

    // create and add big-image
    const bigImage = document.createElement('img');
    bigImage.classList.add('big-img');
    bigImage.src = src;
    document.body.appendChild(bigImage);

    // animations
    fade(overlay, .05, 0, .5);
    fade(bigImage, .05, 0, 1);

    // click on image to remove it
    bigImage.addEventListener('click', removeBigImage);
    overlay.addEventListener('click', removeBigImage);
}

function removeBigImage(event) {
    // remove overlay and big-image
    const overlay = document.querySelector('.big-img-overlay');
    document.body.removeChild(overlay);

    const bigImage = document.querySelector('.big-img');
    document.body.removeChild(bigImage);
}

export function placeholderSrc (width, height) {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;
}

// lazy load images
// https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
export function lazyLoadImages (images, options) {
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