/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "custom-pink-881": "#df6881",
        "custom-yellow-930": "#fde930",
        "custom-yellow-e00": "#ffde00",
        "custom-fuchsia-07e": "#e6007e",
        "custom-calypso-fe3": "#009fe3",
        "custom-green-11f": "#95c11f",
        "custom-orange-b0c": "#ea5b0c",
        "custom-purple-282": "#722282",
      },
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      yellow: colors.yellow,
      pink: colors.pink,
      blue: colors.blue,
      red: colors.red,
      pink: colors.pink,
      green: colors.green,
      sky: colors.sky,
    }),
  },
  purge: {
    enabled: true,
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    options: {
      safelist: [
        "bg-red-600",
        "text-red-600",
        "text-red-500",
        "bg-red-100",
        "bg-pink-600",
        "text-pink-500",
        "text-pink-600",
        "bg-pink-100",
        "gap-x-12",
        "grid-cols-4",
      ],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
