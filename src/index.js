const introTextCont = document.querySelector(".intro");
const cta = document.querySelector('.cta');
const introText = `This world is but a, canvas to our, imagination.`;

const withSpan = [...introText].map((letter, index) => {
    return `<span class='opacity-0 ${letter === " " || letter === "," ? "" : "inline-block"} transform -translate-x-2 translate-y-6' style='animation: text 400ms linear forwards; animation-delay:${
    index * 40
  }ms;'>${letter === "," ? "</br>" : letter === "" ? "&nbsp;" : letter}</span>`;
});

cta.style.animationDelay = `${withSpan.length * 40 + 600}ms`;

setTimeout(() => {
    introTextCont.innerHTML = withSpan.join("");
}, 400);

// const header = document.querySelector('header');

// window.addEventListener("scroll", () => {

//     // console.log(header.querySelector('::after'))
//     const scroll = Math.round(window.scrollY / window.innerHeight * 100)
//     header.setAttribute('data-scroll', `
//             $ { scroll }
//             px `)
// });

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
})