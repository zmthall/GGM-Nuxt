export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#121b75",
          secondary: "#eae39e",
          "main-font": "#dddddd",
          "link-hover": "#ada985",
          "light-gray": "#e1e1e1",
          "dark-gray": "#646464",
          "please-note": "#a3150d",
        },
      },
      fontFamily: {
        main: ["Noto Serif", "serif"],
        headings: ["Cabin", "sans-serif"],
      },
      fontSize: {
        base: ["16px", { lineHeight: "1.5rem" }],
      },
      boxShadow: {
        primary: "0 4px 6px 2px rgba(0, 0, 0, 0.2)",
      },
      screens: {
        "2xs": "320px",
      },
      transitionDuration: {
        main: "0.5s",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
    },
    keyframes: {
      fill: {
        from: {
          top: "100px",
          transform: "translateX(-50%) rotate(0deg)",
        },
        to: {
          top: "-50px",
          transform: "translateX(-50%) rotate(360deg)",
        },
      },
      spin: {
        from: {
          transform: "rotate(0)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
    animation: {
      fill: "fill 3s ease-out forwards",
      spin: "spin 1s linear infinite",
    },
  },
};
