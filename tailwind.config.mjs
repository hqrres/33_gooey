/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-text': 'var(--color-text)', // Custom text color
        'custom-bg': 'var(--color-bg)',     // Custom background color
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      fontFamily: {
        'source-code-pro': ['"source-code-pro"', 'monospace'], // Custom font family
        'kaisei-tokumin': ['"Kaisei Tokumin"', 'serif'],
        'roboto': ['"Roboto"', 'sans-serif'], // Added custom font
      },      
      height: {
        '200px': '200px',
        '300px': '300px',
        '400px': '400px',
        '500px': '500px',
        '600px': '600px',
      },
      zIndex: {
        '-1': '-1',
        '-10': '-10',
        '-20': '-20',
      },
      dropShadow: {
        'extra-strong': '0 4px 6px rgba(0, 0, 0, 0.5)', // Custom shadow
      },
    },
  },
  plugins: [],
};
