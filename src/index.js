//Cursor
const cursor = document.querySelector(".cursor");

let cursorMove = false;
let clickTimeout;

const handleMouseMove = (e) => {
    cursor.style.top = `${e.clientY - 10}px`;
    cursor.style.left = `${e.clientX - 15}px`;
    if (window.innerWidth < 769 && !cursorMove)
        return window.removeEventListener("mousemove", handleMouseMove);
    if (!cursorMove) {
        cursor.classList.remove("hidden");
        cursorMove = true;
    }
};

window.addEventListener("mousemove", handleMouseMove);

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
let menuIsOpen = false;

const toggleMenu = () => {
    clearTimeout(menuClick);
    menuClick = setTimeout(() => {
        menuBtn.classList.toggle("open-menu");
        menu.classList.toggle("show-menu");
        menuIsOpen = !menuIsOpen;
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
let scrollTimeout;

const handleOnScroll = (e) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const currentScrollPos = window.pageYOffset;
        if (
            prevScrollpos > currentScrollPos ||
            currentScrollPos < 300 ||
            menuIsOpen
        ) {
            headerDiv.classList.remove("scrolled");
        } else {
            headerDiv.classList.add("scrolled");
        }
        prevScrollpos = currentScrollPos;
    }, 100);
};

window.addEventListener("scroll", handleOnScroll);

//Services

const serviceCards = document.querySelectorAll(".s-card");
customObserver(serviceCards, "animate-service", true, 0.4);

//About
const bio = document.querySelectorAll("#bio");
customObserver(bio, "show-about", true, 0.5);

//Gallery

// const imgView = document.querySelector(".img-view");
// const activeImage = imgView.querySelector("img");
// const gallery = document.querySelector(".works");
// const zoomOut = imgView.querySelector(".zoom-out");
// const categories = document.querySelectorAll(".category");
// const images = gallery.querySelectorAll(".img");

// customObserver(images, "show-image", false, 0.4);

// window.addEventListener("click", (e) => {
//     if (e.target.classList.contains("zoom-in")) {
//         const selected = e.target.previousElementSibling.src;
//         activeImage.src = selected;
//         imgView.classList.add("show-big-img");
//     }
//     if (e.target.classList.contains("retry")) {
//         const imageEl = e.target.parentElement.nextElementSibling;
//         // /imageEl.src = "./images/img3.png"
//         imageEl.src = `${imageEl.src}?t=${Date.now()}`;
//     }
// });

// zoomOut.addEventListener("click", () => {
//     imgView.classList.remove("show-big-img");
// });

// const handleOnError = (e) => {
//     // e.preventDefault();
//     if (
//         e.target.previousElementSibling &&
//         e.target.previousElementSibling.classList.contains("cover")
//     )
//         return;
//     const el = document.createElement("div");
//     el.className = `${Array.from(e.target.classList).join(
//     " "
//   )} bg-gray-100 flex flex-col items-center justify-center gap-y-2 cover`;
//     el.innerHTML = `
//     <p class="text-xs text-center">Error loading ${e.target.alt.toLowerCase()}</p>
//     <button class="bg-black text-white text-xs py-2 px-4 rounded-full text-xs retry">Retry</button>
//     `;
//     e.target.parentElement.insertBefore(el, e.target);
//     e.target.classList.add("hidden");
//     e.target.setAttribute("data-error", "true");
//     e.target.src = `${e.target.src}?t=${Math.floor(
//     Math.random() * 405 * Math.random()
//   )}`;
// };

// const handleOnReload = (e) => {
//     if (e.target.getAttribute("data-error")) {
//         e.target.removeAttribute("data-error");
//         e.target.classList.remove("hidden");
//         e.target.previousElementSibling.classList.add("hidden");
//     } else {
//         e.target.removeEventListener("error", handleOnError);
//         e.target.removeEventListener("load", handleOnReload);
//     }
// };

// document.querySelectorAll("img").forEach((i) => {
//     i.addEventListener("error", handleOnError);
//     i.addEventListener("load", handleOnReload);
// });

// categories.forEach((button) => {
//     button.addEventListener("click", (e) => {
//         document.querySelector(".active-cat").classList.remove("active-cat");
//         e.target.classList.add("active-cat");
//         const activeCat = e.target.getAttribute("data-cat");
//         if (activeCat === "1") {
//             images.forEach((img) => {
//                 img.classList.add("block");
//                 img.classList.remove("hidden");
//             });
//             return;
//         }
//         const active = gallery.querySelectorAll(`.img.${activeCat}`);
//         active.forEach((img) => {
//             img.classList.add("block");
//             img.classList.remove("hidden");
//         });
//         const inactive = gallery.querySelectorAll(`.img:not(.${activeCat})`);
//         inactive.forEach((img) => {
//             img.classList.remove("block");
//             img.classList.add("hidden");
//         });
//     });
// });

const imageViewer = document.querySelector(".image-viewer");
const imageElement = imageViewer.querySelector("img");
const zoomOut = imageViewer.querySelector(".zoom-out");
const carousel = document.querySelector(".carousel");

const handleZoomIn = (e) => {
    if (!e.target.classList.contains("zoom-in")) return;
    const activeImage = e.target.previousElementSibling.src;
    imageElement.src = activeImage;
    imageViewer.classList.remove("translate-x-full");
};

const handleZoomOut = (e) => {
    imageViewer.classList.add("translate-x-full");
};

carousel.addEventListener("click", handleZoomIn);
zoomOut.addEventListener("click", handleZoomOut);

const imageCards = document.querySelectorAll(".carousel-cell");

customObserver(imageCards, "fade-img", true, 0.5);

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