//Cursor
const cursor = document.querySelector(".cursor");

let cursorMove = false;
let clickTimeout;

window.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY - 10}px`;
    cursor.style.left = `${e.clientX - 15}px`;
    if (!cursorMove && window.innerWidth > 720) {
        cursor.classList.remove("hidden");
        cursorMove = true;
    }
});

window.addEventListener("click", (e) => {
    cursor.classList.add("clicked");
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        cursor.classList.remove("clicked");
    }, 500);
});

//Menu

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
let menuClick;

const toggleMenu = () => {
    clearTimeout(menuClick);
    menuClick = setTimeout(() => {
        menuBtn.classList.toggle("open-menu");
        menu.classList.toggle("show-menu");
    }, 300);
};

menuBtn.addEventListener("click", toggleMenu);
menu.querySelectorAll("a").forEach((item, index) => {
    item.style.transitionDelay = `${150 * (index + 1)}ms`;
    item.addEventListener("click", toggleMenu);
});

//Custom observer

const customObserver = (elements, toggleClass, isInfinite, threshold) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.isIntersecting ?
                    entry.target.classList.add(toggleClass) :
                    entry.target.classList.remove(toggleClass);

                !isInfinite && entry.isIntersecting && observer.unobserve(entry.target);
            });
        }, {
            threshold,
        }
    );

    elements.forEach((entry) => observer.observe(entry));
};

//Hero

const toContact = document.querySelector(".cta-1");
const toGallery = document.querySelector(".cta-2");

const scroller = (id) =>
    window.scrollTo(0, document.getElementById(id).offsetTop);

toContact.addEventListener("click", () => {
    scroller("contact");
});
toGallery.addEventListener("click", () => {
    scroller("gallery");
});

const generateSpans = (text) => {
    let heading = "";
    [...text].forEach((letter, index) => {
        heading += `<span class="${
      letter === " " ? null : "inline-block"
    } translate-y-full letter" style="animation-delay:${40 * index}ms">${
      letter !== " " ? letter : "&nbsp;"
    }</span>`;
    });
    return heading;
};

const heroTexts = document.querySelectorAll(".hero-text");

heroTexts.forEach((line) => {
    const text = line.textContent;
    line.innerHTML = generateSpans(text);
});

//Headings

const headings = document.querySelectorAll(".heading");

customObserver(headings, "show-heading", true, 0.5);
headings.forEach((h) => (h.innerHTML = generateSpans(h.textContent)));

// Hide header on scroll down

let prevScrollpos = window.pageYOffset;
const headerDiv = document.querySelector("header");
const headerBottom = headerDiv.offsetTop + headerDiv.offsetHeight;

window.onscroll = function(e) {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos || currentScrollPos < 300) {
        headerDiv.classList.remove("scrolled");
    } else {
        headerDiv.classList.add("scrolled");
    }

    prevScrollpos = currentScrollPos;
};

//Services

const serviceCards = document.querySelectorAll(".s-card");
customObserver(serviceCards, "animate-service", true, 0.8);

//About
const bio = document.querySelectorAll("#bio");
customObserver(bio, "show-about", true, 0.5);

//Gallery

const imgView = document.querySelector(".img-view");
const activeImage = imgView.querySelector("img");
const gallery = document.querySelector(".works");
const zoomOut = imgView.querySelector(".zoom-out");
const categories = document.querySelectorAll(".category");
const images = gallery.querySelectorAll(".img");

customObserver(images, "show-image", false, 0.4);

gallery.addEventListener("click", (e) => {
    if (!e.target.classList.contains("zoom-in")) return;
    const selected = e.target.previousElementSibling.src;
    activeImage.src = selected;
    imgView.classList.add("show-big-img");
});

zoomOut.addEventListener("click", () => {
    imgView.classList.remove("show-big-img");
});

categories.forEach((button) => {
    button.addEventListener("click", (e) => {
        document.querySelector(".active-cat").classList.remove("active-cat");
        e.target.classList.add("active-cat");
        const activeCat = e.target.getAttribute("data-cat");
        if (activeCat === "1") {
            images.forEach((img) => {
                img.classList.add("block");
                img.classList.remove("hidden");
            });
            return;
        }
        const active = gallery.querySelectorAll(`.img.${activeCat}`);
        active.forEach((img) => {
            img.classList.add("block");
            img.classList.remove("hidden");
        });
        const inactive = gallery.querySelectorAll(`.img:not(.${activeCat})`);
        inactive.forEach((img) => {
            img.classList.remove("block");
            img.classList.add("hidden");
        });
    });
});

//Contact
const contactForm = document.querySelector(".form");
customObserver([contactForm], "show-form", true, 0.7);

const footer = document.querySelector("footer");
const footerTexts = footer.querySelectorAll("p");

customObserver([footer], "show-text", true, 0.5);

window.addEventListener("DOMContentLoaded", () => {
    lax.init();

    // Add a driver that to control animations

    lax.addDriver("scrollY", function() {
        return window.scrollY;
    });

    document.querySelector("body").classList.add("loaded");
});