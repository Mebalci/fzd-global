/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "2.25rem",
        "2xl": "2.5rem",
      },
    },
    extend: {      
      borderRadius: {
        xl: "1.0rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.10)",
        card: "0 12px 40px rgba(0,0,0,0.12)",
        glow: "0 0 40px rgba(215,159,53,0.28)",
      },
      
      
      colors: {        
        ink: {
          950: "#05080E",
          900: "#0A1220",
          800: "#101C2D",
        },
      
        wood: {
          50: "#FBF6EE",
          100: "#F5E9D6",
          200: "#E8D2AC",
          300: "#D4B37B",
          400: "#C59A58",
          500: "#A5752B",
          600: "#885F24",
          700: "#6E4D1E",
          800: "#543A17",
          900: "#3A2710",
        },
       
        steel: {
          50: "#F7FAFC",
          100: "#EDF2F7",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1F2937",
          900: "#111827",
        },

       
        accent: {
          DEFAULT: "#D79F35",
          dark: "#A86A10",
        },
      },
     
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        display: ["Playfair Display", "ui-serif", "Georgia", "serif"],
      },
    
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shine: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shine: "shine 1.2s ease-in-out",
        fadeUp: "fadeUp 500ms ease-out both",
      },
    
      backgroundImage: {
        "grid-soft":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "radial-soft":
          "radial-gradient(800px circle at 20% 10%, rgba(215,159,53,0.18), transparent 55%)",
      },
      backgroundSize: {
        "grid-soft": "36px 36px",
      },
    },
  },
  plugins: [],
};
