//Cursor
const cursor = document.querySelector('.cursor');

window.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});
window.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("letter")) {
        e.target.classList.add("text-white");
    }
});
window.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("letter")) {
        setTimeout(() => {
            e.target.classList.remove("text-white");
        }, 400)
    }
});

window.addEventListener("click", (e) => {
    cursor.classList.add("animate-ping");
    setTimeout(() => {
        cursor.classList.remove("animate-ping");
    }, 400)
});

//Menu

const menuBtn = document.querySelector(".menu-btn");
const list = document.querySelector(".list");

const toggleMenu = () => {
    menuBtn.classList.toggle("open-menu");
    list.classList.toggle("show-menu");
};

menuBtn.addEventListener("click", toggleMenu);

list.querySelectorAll("a").forEach((item, index) => {
    item.style.transitionDelay = `${150 * index}ms`;
});

//Hero

const toContact = document.querySelector(".cta-1");
const toGallery = document.querySelector(".cta-2");

const scroller = id => window.scrollTo(0, document.getElementById(id).offsetTop);

toContact.addEventListener("click", () => {
    scroller("contact");
});
toGallery.addEventListener("click", () => {
    scroller("gallery");
});

const generateSpans = (text, styleProperty) => {
    let heading = "";
    [...text].forEach((letter, index) => {
        heading += `<span class="${
      letter === " " ? null : "inline-block"
    } transition-all duration-700 translate-y-full letter" style="${styleProperty}:${
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