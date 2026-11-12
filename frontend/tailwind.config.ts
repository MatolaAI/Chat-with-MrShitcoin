import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wa: {
          dark: '#111b21',      // Main background
          panel: '#202c33',     // Sidebar / Header background
          hover: '#2a3942',     // Hover state
          border: '#222d34',    // Borders
          green: '#00a884',     // Primary brand green
          lightGreen: '#005c4b',// Outgoing message bubble
          incoming: '#202c33',  // Incoming message bubble
          text: '#e9edef',      // Main text
          muted: '#8696a0',     // Secondary text
          search: '#202c33',    // Search bar
        },
      },
    },
  },
  plugins: [],
};

export default config;