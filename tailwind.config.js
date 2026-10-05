// Tailwind CSS theme for the portfolio — light blue and blue.
// Loaded right after the Tailwind CDN script in mainhtlml.html.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Page background (light blue)
        paper: "#eef4fc",
        // Body text (deep navy blue)
        ink: "#0e2a47",
        // Secondary text
        muted: "#5b7794",
        // Borders and dividers
        line: "#d3e1f3",
        // Primary blue: buttons, contact panel
        brand: "#1a5fb4",
        // Deeper blue for large surfaces
        deep: "#123f7d",
        // Light blue accent
        sky: "#9ad2ff",
        // Text on top of blue surfaces
        cream: "#f4f9ff"
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        sans: ["DM Sans", "sans-serif"]
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(18, 63, 125, 0.45)",
        lift: "0 26px 55px -28px rgba(18, 63, 125, 0.55)"
      }
    }
  }
};