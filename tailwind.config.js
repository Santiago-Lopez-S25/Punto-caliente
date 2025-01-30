const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
};

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: withOpacity("--color-light")({ opacityValue: "0.8" }),
        primary: `rgb(var(--color-primary))`,
        secondary: `rgb(var(--color-secondary))`,
        hover: `rgb(var(--color-hover))`,
      },
      textColor: {
        body: `rgb(var(--text-base))`,
        "body-dark": `rgb(var(--text-base-dark))`,
        muted: `rgb(var(--text-muted))`,
        "muted-light": `rgb(var(--text-muted-light))`,
        heading: `rgb(var(--text-heading))`,
        "sub-heading": `rgb(var(--text-sub-heading))`,
        bolder: `rgb(var(--text-text-bolder))`,
      },
    },
  },
  plugins: [],
};

export default config;
