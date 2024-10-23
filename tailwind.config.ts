import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(65deg, hsl(240deg 67% 91%) 0%, hsl(320deg 100% 87%) 15%, hsl(34deg 100% 72%) 32%, hsl(66deg 89% 58%) 49%, hsl(129deg 100% 75%) 64%, hsl(173deg 100% 52%) 76%, hsl(175deg 82% 58%) 87%, hsl(168deg 56% 57%) 94%, hsl(160deg 35% 53%) 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
