export function resetComicArticleVisibility() {
    const comicMenu = document.querySelector('#comic-menu');
    const comicPages = document.querySelectorAll('.comic-pages');
    
    comicPages.forEach(comic => {
        if (!comic.classList.contains('hidden')) {
            toggleElement(comic); // add hidden
            toggleElement(comicMenu); // remove hidden
        }
    });
}

export function toggleElement(elem) {
    if (elem.classList.contains('hidden')) {
        fade(elem, .05, 0, 1);
        elem.classList.remove('hidden');
    } else {
        elem.classList.add('hidden');
    }
}

export function fade(elem, rate, start, end) {
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