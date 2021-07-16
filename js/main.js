'use strict';

let slider = document.querySelector('.slider'),
    slides = slider.querySelectorAll('.slide'),
    images = slider.querySelectorAll('img'),
    next = slider.querySelector('.next'),
    prev = slider.querySelector('.prev'),
    bulletParent = slider.querySelector('.bullets'),
    bulletChild = slider.querySelectorAll('.bullet'),
    timer,
    x1,
    x2,
    slideNumber = 0;

const initSlider = () => {
    images.forEach(image => {
        slider.style.position = 'relative';
        slider.style.minHeight = image.offsetHeight + 'px';
    });

    slides.forEach(slide => {
        slide.style.position = 'absolute';
        if (slide.classList.contains('active') === true) {
            slide.classList.remove('active');
        }
    });

    if (slides[0].classList.contains('active') === false) {
        slides[0].classList.add('active');
    }
    showActiveBullet();
    clearInterval(timer);
    startLoop();
}

const startLoop = () => {
    timer = setInterval(nextSlide, 5000);
}

const stopLoop = () => {
    clearInterval(timer);
}

const nextSlide = () => {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
            slides[i].classList.remove('active');
            i++;
            if (i === slides.length) {
                i = 0;
                slides[0].classList.add('active');
            }
            slides[i].classList.add('active');
            slideNumber = i;
        }
    }
    showActiveBullet();
}

const prevSlide = () => {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
            slides[i].classList.remove('active');
            i--;
            if (i === -1) {
                i = slides.length - 1;
                slides[i].classList.add('active');
            }
            slides[i].classList.add('active');
            slideNumber = i;
        }
    }
    showActiveBullet();
}

const showActiveBullet = (i = slideNumber) => {
    bulletChild.forEach(bullet => {
        bullet.classList.remove('active-bullet');
    });
    bulletChild[i].classList.add('active-bullet');
}

const handleTouchStart = (event) => {
    x1 = event.touches[0].clientX;
}

const handleTouchEnd = (event) => {
    x2 = event.changedTouches[0].clientX;
    if(x1 > x2 && event.target !== next && event.target !== prev) {
        nextSlide();
        stopLoop();
        startLoop();
    } else if (x1 < x2 && event.target !== next && event.target !== prev) {
        prevSlide();
        stopLoop();
        startLoop();
    }
}

initSlider();
window.addEventListener('resize', initSlider);
next.addEventListener('click', (event) => {
    nextSlide();
    if (event.target.closest('button').classList.contains('next')) {
        stopLoop();
        startLoop();
    }
});

prev.addEventListener('click', (event) => {
    prevSlide();
    if (event.target.closest('button').classList.contains('prev')) {
        stopLoop();
        startLoop();
    }
});

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextSlide();
        stopLoop();
        startLoop();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
        stopLoop();
        startLoop();
    }
});

bulletChild.forEach((bullet, i) => {
    bullet.addEventListener('click', (event) => {
        let target = event.target,
            bulletNumber;

        if (target) {
            bulletNumber = i;
            slideNumber = i;
        }

        slides.forEach(slide => {
            slide.classList.remove('active');
        })

        slides[bulletNumber].classList.add('active');
        showActiveBullet();
        stopLoop();
        startLoop();
    });
});