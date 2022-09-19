/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                main: ["Poppins", "sans-serif"],
                hero: ["Bebas Neue", "sans-serif"]
            },
            fontSize: {
                hero: "clamp(4.5rem, 7.5vw, 8rem)",
            },
            height: {
                hero: "clamp(4rem, 7.5vw, 8rem)",
                card: "calc(10% + 0px)",
            },
            width: {
                header: "calc(100vw - 20%)",
                card: "calc(10% - 1px)",
                service: "calc(100% + 4em)",
            },
            colors: {
                fade: "#ffffffb4"
            }
        },
    },
    plugins: [],
}