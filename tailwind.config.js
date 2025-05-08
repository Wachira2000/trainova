// tailwind.config.js
export default {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        
          backgroundImage: {
            'process-glow': 'linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
          },
        colors: {
          background: 'hsl(240 5% 7%)',      // gray-900
          foreground: 'hsl(210 20% 98%)',    // zinc-50
          accent: 'hsl(262 80% 60%)',        // purple-500
        },
        animation: {
          float: 'float 6s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          }
        }
      },
    },
    plugins: [],
  };