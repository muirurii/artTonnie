/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./src/**/*.{html,js},"],
    theme: {
        extend: {
            fontFamily: {
                main: ["Plus Jakarta Sans", "sans-serif"],
                hero: ["Bebas Neue", "sans-serif"]
            },
            fontSize: {
                hero: "clamp(4rem, 7.5vw, 8rem)",
            },
            height: {
                hero: "clamp(4rem, 9vw, 6rem)",
            },
            width: {
                header: "calc(100vw - 20%)"
            },
            colors: {
                fade: "#ffffffb4"
            }
        },
    },
    plugins: [],
}