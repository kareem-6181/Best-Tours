/* =========================================
   BEST TOURS - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. MOBILE NAVBAR
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("mobile-open");

            menuToggle.classList.toggle("active");

        });

    }


    /* =========================================
       2. NAVBAR LINKS
    ========================================= */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove("mobile-open");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

            // Update active link
            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    /* =========================================
       3. DESTINATIONS CAROUSEL
    ========================================= */

    const destinationStage = document.getElementById("destinationsStage");

    const destinationPrev = document.getElementById("destinationPrev");
    const destinationNext = document.getElementById("destinationNext");

    const destinationIndicators = document.querySelectorAll(
        "#destinationIndicators .indicator"
    );

    if (destinationStage) {

        const destinationCards = Array.from(
            destinationStage.querySelectorAll(".destination-card")
        );

        const totalCards = destinationCards.length;

        let currentIndex = 0;

        let autoSlideInterval = null;

        const AUTO_SLIDE_DELAY = 4000;


        /* =====================================
           UPDATE CAROUSEL
        ===================================== */

        function updateCarousel() {

            destinationCards.forEach((card, index) => {

                // Calculate card position relative to center
                let offset = index - currentIndex;

                // Circular positioning
                if (offset > Math.floor(totalCards / 2)) {
                    offset -= totalCards;
                }

                if (offset < -Math.floor(totalCards / 2)) {
                    offset += totalCards;
                }


                // Reset old classes
                card.classList.remove(
                    "center-card",
                    "side-card",
                    "outer-card"
                );


                // Set visual position
                card.style.order = offset + Math.floor(totalCards / 2);


                // Center card
                if (offset === 0) {

                    card.classList.add("center-card");

                }

                // Side cards
                else if (Math.abs(offset) === 1) {

                    card.classList.add("side-card");

                }

                // Outer cards
                else {

                    card.classList.add("outer-card");

                }

            });


            // Update indicators
            destinationIndicators.forEach((indicator, index) => {

                indicator.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });

        }


        /* =====================================
           NEXT CARD
        ===================================== */

        function nextDestination() {

            currentIndex++;

            if (currentIndex >= totalCards) {
                currentIndex = 0;
            }

            updateCarousel();

        }


        /* =====================================
           PREVIOUS CARD
        ===================================== */

        function previousDestination() {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = totalCards - 1;
            }

            updateCarousel();

        }


        /* =====================================
           ARROW BUTTONS
        ===================================== */

        if (destinationNext) {

            destinationNext.addEventListener("click", () => {

                nextDestination();

                restartAutoSlide();

            });

        }


        if (destinationPrev) {

            destinationPrev.addEventListener("click", () => {

                previousDestination();

                restartAutoSlide();

            });

        }


        /* =====================================
           CLICK ON CARD
        ===================================== */

        destinationCards.forEach((card, index) => {

            card.addEventListener("click", () => {

                if (currentIndex !== index) {

                    currentIndex = index;

                    updateCarousel();

                    restartAutoSlide();

                }

            });

        });


        /* =====================================
           INDICATORS
        ===================================== */

        destinationIndicators.forEach((indicator, index) => {

            indicator.addEventListener("click", () => {

                currentIndex = index;

                updateCarousel();

                restartAutoSlide();

            });

        });


        /* =====================================
           KEYBOARD NAVIGATION
        ===================================== */

        document.addEventListener("keydown", (event) => {

            const activeElement = document.activeElement;

            const isTyping =
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.isContentEditable
                );

            if (isTyping) return;

            if (event.key === "ArrowRight") {

                nextDestination();

                restartAutoSlide();

            }

            else if (event.key === "ArrowLeft") {

                previousDestination();

                restartAutoSlide();

            }

        });


        /* =====================================
           AUTO SLIDE
        ===================================== */

        let isStageVisible = false;
        let isStageHovered = false;

        function startAutoSlide() {

            stopAutoSlide();

            // Run the carousel only while its section is visible.
            if (totalCards <= 1 || !isStageVisible || isStageHovered) return;

            autoSlideInterval = setInterval(() => {

                nextDestination();

            }, AUTO_SLIDE_DELAY);

        }


        function stopAutoSlide() {

            if (autoSlideInterval) {

                clearInterval(autoSlideInterval);

                autoSlideInterval = null;

            }

        }


        function restartAutoSlide() {

            stopAutoSlide();

            startAutoSlide();

        }


        /* =====================================
           PAUSE ON HOVER
        ===================================== */

        destinationStage.addEventListener("mouseenter", () => {

            isStageHovered = true;

            stopAutoSlide();

        });


        destinationStage.addEventListener("mouseleave", () => {

            isStageHovered = false;

            startAutoSlide();

        });


        /* =====================================
           VISIBILITY OBSERVER
        ===================================== */

        // Pause automatic card changes while the carousel is off-screen.
        if ("IntersectionObserver" in window) {

            const destinationObserver = new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    isStageVisible = entry.isIntersecting;

                    if (isStageVisible) {

                        startAutoSlide();

                    } else {

                        stopAutoSlide();

                    }

                });

            }, { threshold: 0.15 });

            destinationObserver.observe(destinationStage);

        } else {

            // Fallback for browsers without IntersectionObserver.
            isStageVisible = true;

        }


        /* =====================================
           TOUCH / SWIPE
        ===================================== */

        let touchStartX = 0;

        let touchEndX = 0;

        destinationStage.addEventListener("touchstart", (event) => {

            touchStartX = event.changedTouches[0].screenX;

        }, { passive: true });


        destinationStage.addEventListener("touchend", (event) => {

            touchEndX = event.changedTouches[0].screenX;

            const swipeDistance = touchStartX - touchEndX;

            if (Math.abs(swipeDistance) > 50) {

                if (swipeDistance > 0) {

                    nextDestination();

                } else {

                    previousDestination();

                }

                restartAutoSlide();

            }

        }, { passive: true });


        /* =====================================
           INITIALIZE
        ===================================== */

        updateCarousel();

        startAutoSlide();

    }

});