//Cursor
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY - 10}px`;
    cursor.style.left = `${e.clientX - 15}px`;
});
window.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("letter")) {
        e.target.classList.add("skew-y-12");
    }
});
window.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("letter")) {
        setTimeout(() => {
            e.target.classList.remove("skew-y-12");
        }, 400);
    }
});

window.addEventListener("click", (e) => {
    cursor.classList.add("clicked");
    setTimeout(() => {
        cursor.classList.remove("clicked");
    }, 400);
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

const headingObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("show-heading");
                headingObserver.unobserve(e.target);
            }
        });
    }, {
        threshold: 1,
    }
);

headings.forEach((h) => {
    h.innerHTML = generateSpans(h.textContent);
    headingObserver.observe(h);
});

// Hide header on scroll down

let prevScrollpos = window.pageYOffset;
const headerDiv = document.querySelector("header");
const headerBottom = headerDiv.offsetTop + headerDiv.offsetHeight;

window.onscroll = function(e) {

    const currentScrollPos = window.pageYOffset;
    if (menu.classList.contains("show-menu")) {
        return null;
    } else if (
        prevScrollpos > currentScrollPos ||
        currentScrollPos < headerBottom
    ) {
        headerDiv.classList.remove("scrolled");
    } else {
        headerDiv.classList.add("scrolled");
    }

    prevScrollpos = currentScrollPos;
};

//Services

const serviceCards = document.querySelectorAll(".s-card");

const serviceObserver = new IntersectionObserver(
    (entry) => {
        entry.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("animate-service");
                serviceObserver.unobserve(e.target);
            }
        });
    }, {
        threshold: 0.8,
    }
);

serviceCards.forEach((card) => serviceObserver.observe(card));

//About
const bio = document.querySelector("#bio");

const aboutObserver = new IntersectionObserver(
    (entry) => {
        entry.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("show-about");
                aboutObserver.unobserve(e.target);
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
                galleryObserver.unobserve(e.target);
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
                contactObserver.unobserve(e.target);
            }
        });
    }, {
        threshold: 0.7,
    }
);

contactObserver.observe(contactForm);

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector("body").classList.add("loaded");
    }, 2000);
});