/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
  // Force include all dark mode classes that might be missed
  safelist: [
    // Background colors
    'dark:bg-slate-900',
    'dark:bg-slate-800', 
    'dark:bg-slate-700',
    'dark:bg-slate-600',
    // Text colors
    'dark:text-white',
    'dark:text-slate-100',
    'dark:text-slate-200',
    'dark:text-slate-300', 
    'dark:text-slate-400',
    'dark:text-blue-400',
    'dark:text-emerald-400',
    'dark:text-purple-400',
    'dark:text-amber-400',
    // Border colors
    'dark:border-slate-700',
    'dark:border-slate-600',
    'dark:border-slate-800',
    // Hover states
    'dark:hover:bg-slate-800',
    'dark:hover:bg-slate-700',
    'dark:hover:bg-slate-600',
    'dark:hover:text-slate-100',
    'dark:hover:text-slate-200',
    'dark:hover:border-slate-600',
    // Gradients
    'dark:from-blue-900/20',
    'dark:via-cyan-900/20',
    'dark:to-blue-900/30',
    'dark:from-purple-900/20',
    'dark:via-violet-900/20',
    'dark:to-indigo-900/30',
    'dark:from-blue-400',
    'dark:via-purple-400',
    'dark:to-cyan-400',
    'dark:from-blue-500',
    'dark:to-purple-500',
    'dark:hover:from-blue-600',
    'dark:hover:to-purple-600',
    // Shadows
    'dark:shadow-slate-900/50',
    'dark:hover:shadow-slate-900/70',
    'dark:shadow-slate-100/5',
    'dark:hover:shadow-slate-100/10',
    // Special backgrounds
    'dark:bg-amber-900/30',
  ]
}