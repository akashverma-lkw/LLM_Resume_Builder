/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ✅ dark mode enabled
  theme: {
    extend: {
      typography: (theme) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.gray.300"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-links": theme("colors.blue.400"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-quotes": theme("colors.gray.400"),
            "--tw-prose-code": theme("colors.green.400"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // ✅ adds prose + dark:prose-invert
  ],
};
