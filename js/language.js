/* =====================================
   LANGUAGE SWITCHER
===================================== */

const languageButtons = document.querySelectorAll(".language-btn");

const translatableElements = document.querySelectorAll("[data-en][data-ar]");


/* =====================================
   CHANGE LANGUAGE
===================================== */

function changeLanguage(language) {

    if (language !== "en" && language !== "ar") return;


    /* HTML LANGUAGE */

    document.documentElement.lang = language;


    /* PAGE DIRECTION */

    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document.body.setAttribute(
        "dir",
        language === "ar" ? "rtl" : "ltr"
    );


    /* TRANSLATE ELEMENTS */

    translatableElements.forEach(element => {

        element.textContent = element.dataset[language];

    });


    /* ACTIVE LANGUAGE BUTTON */

    languageButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.lang === language) {

            button.classList.add("active");

        }

    });


    /* SAVE LANGUAGE */

    localStorage.setItem("bestToursLanguage", language);

}


/* =====================================
   LANGUAGE BUTTON EVENTS
===================================== */

languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        changeLanguage(button.dataset.lang);

    });

});


/* =====================================
   DEFAULT LANGUAGE
===================================== */

const savedLanguage = localStorage.getItem("bestToursLanguage");

changeLanguage(savedLanguage || "ar");



/* =====================================
   THEME SWITCHER
===================================== */

const themeToggle = document.getElementById("themeToggle");

const themeIcon = themeToggle
    ? themeToggle.querySelector("i")
    : null;


/* =====================================
   CHANGE THEME
===================================== */

function changeTheme(theme) {

    if (theme !== "light" && theme !== "dark") return;


    /* APPLY THEME */

    document.documentElement.setAttribute("data-theme", theme);


    /* UPDATE BUTTON ICON */

    if (themeIcon) {

        themeIcon.classList.remove("fa-moon", "fa-sun");

        themeIcon.classList.add(
            theme === "dark" ? "fa-sun" : "fa-moon"
        );

    }


    /* UPDATE BUTTON LABEL */

    if (themeToggle) {

        const language = document.documentElement.lang;

        themeToggle.setAttribute(
            "aria-label",
            theme === "dark"
                ? (language === "ar" ? "تفعيل الوضع الفاتح" : "Switch to light mode")
                : (language === "ar" ? "تفعيل الوضع الداكن" : "Switch to dark mode")
        );

        themeToggle.setAttribute(
            "title",
            theme === "dark"
                ? (language === "ar" ? "الوضع الفاتح" : "Light Mode")
                : (language === "ar" ? "الوضع الداكن" : "Dark Mode")
        );

    }


    /* SAVE THEME */

    localStorage.setItem("bestToursTheme", theme);

}


/* =====================================
   THEME BUTTON EVENT
===================================== */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme") || "light";

        const newTheme =
            currentTheme === "light" ? "dark" : "light";

        changeTheme(newTheme);

    });

}


/* =====================================
   DEFAULT THEME
===================================== */

const savedTheme = localStorage.getItem("bestToursTheme");

changeTheme(savedTheme || "light");