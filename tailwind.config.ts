import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF5E2",
        sage: {
          100: "#A3C69C",
          300: "#8CAE86",
          500: "#75976F",
          700: "#5E7F59",
          900: "#476742",
          950: "#2E4529",
        },
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
