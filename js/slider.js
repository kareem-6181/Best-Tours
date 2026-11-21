/* =====================================
   HERO SLIDER
===================================== */

const slides = document.querySelectorAll(".hero-slide");

const dots = document.querySelectorAll(".slider-dot");

const nextButton = document.getElementById("nextSlide");

const prevButton = document.getElementById("prevSlide");

const heroSlider = document.getElementById("home");


let currentSlide = 0;

let sliderInterval;

const sliderDuration = 6000;


/* =====================================
   SHOW SLIDE
===================================== */

function showSlide(index) {

    if (!slides.length) return;

    slides.forEach(slide => {

        slide.classList.remove("active");

    });

    dots.forEach(dot => {

        dot.classList.remove("active");

    });


    currentSlide = (index + slides.length) % slides.length;


    slides[currentSlide].classList.add("active");


    if (dots[currentSlide]) {

        dots[currentSlide].classList.add("active");

    }

}


/* =====================================
   NEXT SLIDE
===================================== */

function nextSlide() {

    showSlide(currentSlide + 1);

}


/* =====================================
   PREVIOUS SLIDE
===================================== */

function previousSlide() {

    showSlide(currentSlide - 1);

}


/* =====================================
   AUTO SLIDER
===================================== */

function startSlider() {

    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {

        nextSlide();

    }, sliderDuration);

}


/* =====================================
   SLIDER BUTTONS
===================================== */

if (nextButton) {

    nextButton.addEventListener("click", () => {

        nextSlide();

        startSlider();

    });

}


if (prevButton) {

    prevButton.addEventListener("click", () => {

        previousSlide();

        startSlider();

    });

}


/* =====================================
   SLIDER DOTS
===================================== */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        startSlider();

    });

});


/* =====================================
   MOBILE TOUCH SLIDER
===================================== */

let touchStartX = 0;

let touchEndX = 0;


if (heroSlider) {

    heroSlider.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    heroSlider.addEventListener("touchend", event => {

        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;


        if (Math.abs(difference) < 50) return;


        if (difference > 0) {

            nextSlide();

        } else {

            previousSlide();

        }

        startSlider();

    }, { passive: true });

}


/* =====================================
   START SLIDER
===================================== */

if (slides.length > 0) {

    showSlide(0);

    startSlider();

}