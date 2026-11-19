const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

const savedTheme = localStorage.getItem("abrailk-theme");

let currentTheme = savedTheme === "dark" ? "dark" : "light";

function applyTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    currentTheme = theme;

    if (themeToggle && themeIcon) {

        if (theme === "dark") {

            themeIcon.textContent = "☀";
            themeToggle.setAttribute("aria-label", "Switch to light mode");

        } else {

            themeIcon.textContent = "☾";
            themeToggle.setAttribute("aria-label", "Switch to dark mode");

        }

    }

}

applyTheme(currentTheme);

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const newTheme = currentTheme === "light" ? "dark" : "light";

        applyTheme(newTheme);

        // Remember the visitor's selection.
        localStorage.setItem("abrailk-theme", newTheme);

    });

}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuToggle && navigation) {

    function closeNavigation() {

        navigation.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

    }

    menuToggle.addEventListener("click", function () {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        navigation.classList.toggle("is-open", !isOpen);

        menuToggle.setAttribute("aria-expanded", String(!isOpen));

        menuToggle.setAttribute(
            "aria-label",
            !isOpen ? "Close navigation" : "Open navigation"
        );

    });

    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", closeNavigation);

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeNavigation();
        }

    });

}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("input", function () {

        formStatus.textContent = "";
        formStatus.classList.remove("is-error", "is-success");

    });

}

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        formStatus.classList.remove("is-error", "is-success");

        const nameInput = contactForm.elements.namedItem("name");
        const emailInput = contactForm.elements.namedItem("email");
        const messageInput = contactForm.elements.namedItem("message");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            formStatus.textContent =
                "Please check your details and try again.";

            formStatus.classList.add("is-error");

            return;
        }

        if (!name || !email || !message) {

            formStatus.textContent =
                "Please complete all fields before submitting.";

            formStatus.classList.add("is-error");

            if (!name) {
                nameInput.focus();
            } else if (!email) {
                emailInput.focus();
            } else {
                messageInput.focus();
            }

            return;
        }

        formStatus.textContent =
            `Thanks, ${name}! Your details look good. This demo form is not connected to email yet, so your message has not been sent.`;

        formStatus.classList.add("is-success");

        contactForm.reset();

    });

}

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {

    // Show everything immediately if animations are disabled
    // or the browser does not support IntersectionObserver.

    revealElements.forEach(function (element) {

        element.classList.add("is-visible");

    });

} else {

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    // Animate each element only once.
                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }

    );

    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

}
