import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        cta: {
          DEFAULT: "hsl(var(--cta))",
          foreground: "hsl(var(--cta-foreground))",
          hover: "hsl(var(--cta-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "Fraunces",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 4.8vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 3.6vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 1px 2px hsl(218 30% 12% / 0.05), 0 4px 12px hsl(218 30% 12% / 0.04)",
        "soft-lg": "0 4px 16px hsl(218 30% 12% / 0.08), 0 12px 32px hsl(218 30% 12% / 0.06)",
        "soft-xl": "0 12px 32px hsl(218 30% 12% / 0.10), 0 24px 64px hsl(218 30% 12% / 0.08)",
        cta: "0 1px 0 hsl(218 60% 8% / 0.4), 0 8px 24px hsl(218 50% 16% / 0.30)",
        "cta-hover": "0 1px 0 hsl(218 60% 8% / 0.4), 0 12px 32px hsl(218 50% 16% / 0.40)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
