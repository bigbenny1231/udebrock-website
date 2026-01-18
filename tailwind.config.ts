import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f4f1', 100: '#d9e5dc', 200: '#b3cbb9',
          300: '#8db196', 400: '#679773', 500: '#4a6f54',
          600: '#3d5a44', 700: '#304534', 800: '#233024', 900: '#161b14',
        },
        walnut: {
          50: '#f7f3f0', 100: '#e8dfd7', 200: '#d1bfaf',
          300: '#ba9f87', 400: '#a37f5f', 500: '#6b4423',
          600: '#56371c', 700: '#412a15', 800: '#2c1c0e', 900: '#170f07',
        },
        antique: {
          50: '#fdfaf5', 100: '#f9f0e0', 200: '#f3e1c1',
          300: '#edd2a2', 400: '#e7c383', 500: '#d4a855',
          600: '#aa8644', 700: '#7f6533', 800: '#554322', 900: '#2a2111',
        },
        cream: '#f5f1e8',
      },
      fontFamily: {
        display: ['var(--font-zilla)', 'Rockwell', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'tactile': '0 4px 6px -1px rgba(107, 68, 35, 0.1), 0 2px 4px -1px rgba(107, 68, 35, 0.06)',
        'tactile-lg': '0 10px 15px -3px rgba(107, 68, 35, 0.1), 0 4px 6px -2px rgba(107, 68, 35, 0.05)',
        'carved': 'inset 0 2px 4px 0 rgba(107, 68, 35, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
