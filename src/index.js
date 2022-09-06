//Menu

const menu = document.querySelector(".menu");
const smallMenu = document.querySelector(".small-menu");
const menuBtn = document.querySelector(".menu-btn");

const toggleMenu = () => {
    menuBtn.classList.toggle("open-menu");
    if (window.innerWidth < 640) {
        smallMenu.classList.toggle("show-menu");
    } else {
        menu.classList.toggle("show-menu");
    }
};

menuBtn.addEventListener("click", toggleMenu);
smallMenu.addEventListener("click", toggleMenu);

smallMenu.querySelectorAll("a").forEach((item, index) => {
    item.style.transitionDelay = `${150 * index}ms`;
});
menu.querySelectorAll("a").forEach((item, index) => {
    item.style.transitionDelay = `${150 * index}ms`;
});

//Hero

const cta = document.querySelector(".cta");

cta.addEventListener("click", () => {
    window.scrollTo(0, document.getElementById("contact").offsetTop);
});

const generateSpans = (text, styleProperty) => {
    let heading = "";
    [...text].forEach((letter, index) => {
        heading += `<span class="${
      letter === " " ? null : "inline-block"
    } transition-transform duration-1000 translate-y-full" style="${styleProperty}:${
      40 * index
    }ms">${letter !== " " ? letter : "&nbsp;"}</span>`;
    });
    return heading;
};

const heroTexts = document.querySelectorAll(".hero-text");

heroTexts.forEach((line) => {
    const text = line.textContent;
    line.innerHTML = generateSpans(text, "animation-delay");
});

// Hide header on scroll down

let prevScrollpos = window.pageYOffset;
const headerDiv = document.querySelector("header");
const headerBottom = headerDiv.offsetTop + headerDiv.offsetHeight;

window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos || currentScrollPos < headerBottom) {
        headerDiv.classList.remove("-translate-y-full");
    } else {
        headerDiv.classList.add("-translate-y-full");
    }

    prevScrollpos = currentScrollPos;
};

//Headings

const headings = document.querySelectorAll(".heading");

const headingObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            e.isIntersecting ?
                e.target.classList.add("show-heading") :
                e.target.classList.remove("show-heading");
        });
    }, {
        threshold: 1,
    }
);

headings.forEach((h) => {
    h.innerHTML = generateSpans(h.textContent, "transition-delay");
    headingObserver.observe(h);
});

//About
const bio = document.querySelector("#bio");

const aboutObserver = new IntersectionObserver(
    (entry) => {
        entry.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("show-about");
            } else {
                e.target.classList.remove("show-about");
            }
        });
    }, {
        threshold: 0.5,
    }
);

aboutObserver.observe(bio);

//Gallery

const imgView = document.querySelector(".img-view");
const activeImage = imgView.querySelector("img");
const gallery = document.querySelector(".works");
const zoomOut = imgView.querySelector(".zoom-out");
const categories = document.querySelectorAll(".category");
const images = gallery.querySelectorAll(".img");

const galleryObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("show-image");
            } else {
                e.target.classList.remove("show-image");
            }
        });
    }, {
        threshold: 0.4,
    }
);

images.forEach((image) => galleryObserver.observe(image));

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

const contactObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("show-form");
            } else {
                e.target.classList.remove("show-form");
            }
        });
    }, {
        threshold: 0.7,
    }
);

contactObserver.observe(contactForm);

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("body").classList.add("loaded");
});