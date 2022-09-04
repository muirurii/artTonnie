//Hero

const introTextCont = document.querySelector(".intro");
const cta = document.querySelector('.cta');
const introText = `This world is but a, canvas to our, imagination.`;

const withSpan = [...introText].map((letter, index) => {
    return `<span class='opacity-0 ${letter === " " || letter === "," ? "" : "inline-block"} transform -translate-x-2 translate-y-6' style='animation: text 400ms linear forwards; animation-delay:${
    index * 40
  }ms;'>${letter === "," ? "</br>" : letter === "" ? "&nbsp;" : letter}</span>`;
});

cta.style.animationDelay = `${withSpan.length * 40 + 600}ms`;
cta.style.animationName = "text";

setTimeout(() => {
    introTextCont.innerHTML = withSpan.join("");
}, 400);

// Hide header on scroll down

// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var navbarHeight = $('header').outerHeight();

// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 250);

// function hasScrolled() {
//     var st = $(this).scrollTop();

//     // Make scroll more than delta
//     if(Math.abs(lastScrollTop - st) <= delta)
//         return;

//     // If scrolled down and past the navbar, add class .nav-up.
//     if (st > lastScrollTop && st > navbarHeight){
//         // Scroll Down
//         $('header').removeClass('nav-down').addClass('nav-up');
//     } else {
//         // Scroll Up
//         if(st + $(window).height() < $(document).height()) {
//             $('header').removeClass('nav-up').addClass('nav-down');
//         }
//     }

//     lastScrollTop = st;
// }

//Headings

const headings = document.querySelectorAll(".heading");

const generateSpans = text => {
    let heading = '';
    [...text].forEach((letter, index) => {
        heading += `<span class="${letter === " " ? null : "inline-block"} transition-transform duration-1000 translate-y-9" style="transition-delay:${40 * index}ms">${letter}</span>`
    });
    return heading;
}



const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        e.isIntersecting ? e.target.classList.add('show-heading') : e.target.classList.remove('show-heading');
    })
}, {
    threshold: 1
});

headings.forEach(h => {
    h.innerHTML = generateSpans(h.textContent);
    headingObserver.observe(h);
});

//About
const bio = document.querySelector('#bio');

const aboutObserver = new IntersectionObserver((entry) => {
    entry.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('show-about');
        } else {
            e.target.classList.remove('show-about');
        }
    })
}, {
    threshold: 0.5
});

aboutObserver.observe(bio);

//Gallery

const imgView = document.querySelector('.img-view');
const activeImage = imgView.querySelector("img");
const gallery = document.querySelector('.works');
const zoomOut = imgView.querySelector(".zoom-out");
const categories = document.querySelectorAll(".category");
const images = gallery.querySelectorAll(".img");

gallery.addEventListener("click", (e) => {
    if (!e.target.classList.contains("zoom-in")) return;
    const selected = e.target.previousElementSibling.src;
    activeImage.src = selected;
    // imgView.classList.toggle("show-big-img");
    imgView.classList.add("show-big-img");
});

zoomOut.addEventListener("click", () => {
    imgView.classList.remove("show-big-img");
    // imgView.classList.add("hidden");
});

categories.forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelector(".active-cat").classList.remove("active-cat");
        e.target.classList.add("active-cat");
        const activeCat = e.target.getAttribute("data-cat");
        if (activeCat === "1") {
            images.forEach(img => {
                img.classList.add("block")
                img.classList.remove("hidden")
            });
            return;
        };
        const active = gallery.querySelectorAll(`.img.${activeCat}`);
        active.forEach(img => {
            img.classList.add("block")
            img.classList.remove("hidden")
        });
        const inactive = gallery.querySelectorAll(`.img:not(.${activeCat})`);
        inactive.forEach(img => {
            img.classList.remove("block")
            img.classList.add("hidden")
        });
    })
});

//Contact 
const contactForm = document.querySelector('.form');

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('show-form');
        } else {
            e.target.classList.remove('show-form');
        }
    })
}, {
    threshold: 0.7
});

contactObserver.observe(contactForm);