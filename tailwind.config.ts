// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#f8f7f4',
        foreground: '#333333',
        primary: {
          DEFAULT: '#333333',
          foreground: '#f8f7f4',
        },
        secondary: {
          DEFAULT: '#e6e4e1',
          foreground: '#333333',
        },
        accent: {
          DEFAULT: '#d1cdc5',
          foreground: '#333333',
        },
        tertiary: '#40281c',
        muted: {
          DEFAULT: '#e6e4e1',
          foreground: '#666666',
        },
        destructive: {
          DEFAULT: '#d26f6f',
          foreground: '#000000',
        },
      },
      boxShadow: {
        form: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        profile: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        'ibm-plex-serif': 'var(--font-ibm-plex-serif)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
