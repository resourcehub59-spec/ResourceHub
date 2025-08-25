/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // class-based dark mode
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      boxShadow: { 
        soft: '0 10px 30px -12px rgba(2,6,23,0.2)',
        blue: '0 4px 20px rgba(59, 130, 246, 0.2)'
      },
      borderRadius: { '2xl': '1.25rem' },
      colors: {
        primary: '#3B82F6',       // Tailwind blue-500
        primaryLight: '#EFF6FF',  // light blue backgrounds
        textLight: '#1E293B',     // dark gray text for light backgrounds
        textDark: '#F1F5F9',      // light text for dark backgrounds
        backgroundDark: '#111827', // dark mode background
        backgroundLight: '#F9FAFB' // light mode background
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
