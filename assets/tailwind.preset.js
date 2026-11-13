/**
 * Duolingo UI — Tailwind CSS preset.
 *
 * Tailwind v3: `presets: [require('./duolingo/assets/tailwind.preset.js')]`
 * Tailwind v4: copy the values into an `@theme` block, or import this preset
 * through `@config`.
 *
 * Values mirror assets/duolingo.css and assets/tokens.json. The preset only
 * exposes the design tokens as utilities (`bg-duo-feather-500`,
 * `rounded-duo-lg`, `shadow-duo-btn-edge`); component styling still lives in
 * duolingo.css. Everything is namespaced under `duo` so the kit never
 * collides with your product's own palette.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        duo: {
          feather: {
            100: '#ecffde',
            200: '#d6ffb8',
            500: '#58cc02',
            600: '#79d634',
            700: '#58a700',
            800: '#478700',
          },
          macaw: {
            100: '#e8f7fe',
            150: '#ddf4ff',
            200: '#d1ebf7',
            300: '#63c9f9',
            500: '#1cb0f6',
            600: '#1899d6',
          },
          cardinal: { 100: '#ffdfe0', 500: '#ff4b4b' },
          bee: { 100: '#ffef8f', 200: '#fbe56d', 500: '#ffc800', 600: '#e6a000', 700: '#cd7900' },
          fox: { 100: '#ffedab', 500: '#ff9600', 700: '#cd7900' },
          beetle: { 100: '#f4e6ff', 200: '#edd1ff', 300: '#daa0ff', 500: '#ce82ff', 600: '#a568cc', 700: '#9069cd' },
          pink: { 100: '#fff2f9', 200: '#ffe5f4', 500: '#d84f9e' },
          mint: { 500: '#5aeab1' },
          eel: '#4b4b4b',
          wolf: '#777777',
          hare: '#afafaf',
          swan: '#e5e5e5',
          polar: '#f7f7f7',
          snow: '#ffffff',
          ink: '#000000',
          scrim: 'rgba(0, 0, 0, 0.5)',
        },
      },
      fontFamily: {
        duo: ['Duo Rounded', 'Nunito', 'DIN 2014 Rounded VF', 'ui-rounded', 'system-ui', 'sans-serif'],
        'duo-web': ['Instrument Sans', 'Inter', 'Duo Rounded', 'Nunito', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'duo-display': ['96px', { lineHeight: '1', letterSpacing: '0' }],
        'duo-h1': ['32px', { lineHeight: '1.15', letterSpacing: '-0.5px', fontWeight: '800' }],
        'duo-h2': ['26px', { lineHeight: '1.2', letterSpacing: '-0.52px', fontWeight: '800' }],
        'duo-h3': ['22px', { lineHeight: '1.2', letterSpacing: '-0.44px', fontWeight: '800' }],
        'duo-h4': ['21px', { lineHeight: '1.1', letterSpacing: '-0.105px', fontWeight: '800' }],
        'duo-body-lg': ['20px', { lineHeight: '1.2', letterSpacing: '0.6px' }],
        'duo-body': ['16px', { lineHeight: '1.2', letterSpacing: '-0.16px' }],
        'duo-sm': ['14px', { lineHeight: '1.2' }],
        'duo-xs': ['12px', { lineHeight: '1.2' }],
        'duo-caps': ['16px', { lineHeight: '1.25', letterSpacing: '0.8px', fontWeight: '800' }],
      },
      letterSpacing: {
        'duo-caps': '0.8px',
        'duo-tight': '-0.52px',
      },
      borderRadius: {
        'duo-xs': '8px',
        'duo-sm': '10px',
        'duo-md': '13px',
        'duo-lg': '16px',
        'duo-xl': '20px',
        'duo-pill': '999px',
        'duo-phone': '40px',
      },
      borderWidth: {
        'duo-2': '2px',
      },
      boxShadow: {
        // Solid offset "edges", not blurred drop shadows. The offset equals the
        // button's edge height; pressing collapses it to zero.
        'duo-btn-blue': '0 5px 0 #1899d6',
        'duo-btn-green': '0 5px 0 #478700',
        'duo-btn-red': '0 5px 0 #e03c3c',
        'duo-btn-gold': '0 5px 0 #e6a000',
        'duo-btn-purple': '0 5px 0 #a568cc',
        'duo-btn-grey': '0 5px 0 #e5e5e5',
        'duo-card': '0 2px 0 #e5e5e5',
        'duo-sheet': '0 -8px 24px rgba(0, 0, 0, 0.2)',
        'duo-node': '0 7px 0 #a568cc',
        'duo-node-gold': '0 7px 0 #e6a000',
      },
      dropShadow: {
        'duo-icon': '0 1px 0 rgba(0, 0, 0, 0.16)',
      },
      spacing: {
        'duo-screen-w': '430px',
        'duo-screen-h': '932px',
        'duo-appbar': '54px',
        'duo-nav': '94px',
        'duo-btn': '48px',
        'duo-btn-sm': '38px',
        'duo-bar': '19px',
        'duo-stat': '68px',
        'duo-word': '46px',
        'duo-tap': '40px',
      },
      transitionDuration: {
        'duo-press': '60ms',
        'duo-fast': '150ms',
        'duo-scrim': '200ms',
        'duo-sheet': '280ms',
        'duo-burst': '420ms',
      },
      transitionTimingFunction: {
        'duo-out': 'cubic-bezier(0.2, 0.9, 0.3, 1)',
        'duo-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'duo-pop': 'duo-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'duo-sheet-up': 'duo-sheet-up 280ms cubic-bezier(0.2, 0.9, 0.3, 1)',
      },
      keyframes: {
        'duo-pop': {
          '0%': { transform: 'scale(0.86)' },
          '60%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
        'duo-sheet-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
};
