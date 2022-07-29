/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-red': '#FD2D01',
                'secondary-pink': '#FFD7D7',
                'tertiary-black': '#4E5166',
                'black-rgba': 'rgba(0, 0, 0, 0.45)',
            },
            spacing: {
                '1vw': '1vw',
            },
        },
    },
    plugins: [],
};
