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
            },
            width: {
                header: "calc(100vw - 20%)",
                service: "calc(100% + 1em)",
            },
            colors: {
                fade: "#ffffffb4"
            }
        },
    },
    plugins: [],
}