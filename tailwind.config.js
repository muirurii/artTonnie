/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js},", "./*.html"],
    theme: {
        extend: {
            fontFamily: {
                main: ["Plus Jakarta Sans", "sans-serif"],
                hero: ["Bebas Neue", "sans-serif"]
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