// This component exists solely to force Tailwind CSS to include dark mode classes
// It should never be rendered in the actual app
export const DarkModeClasses = () => {
  return (
    <div className="hidden">
      {/* Force include all dark mode classes used in the app */}
      <div className="dark:bg-slate-900 dark:bg-slate-800 dark:bg-slate-700 dark:bg-slate-600"></div>
      <div className="dark:text-white dark:text-slate-100 dark:text-slate-200 dark:text-slate-300 dark:text-slate-400"></div>
      <div className="dark:text-blue-400 dark:text-emerald-400 dark:text-purple-400 dark:text-amber-400"></div>
      <div className="dark:border-slate-700 dark:border-slate-600 dark:border-slate-800"></div>
      <div className="dark:hover:bg-slate-800 dark:hover:bg-slate-700 dark:hover:bg-slate-600"></div>
      <div className="dark:hover:text-slate-100 dark:hover:text-slate-200 dark:hover:border-slate-600"></div>
      <div className="dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-900/30"></div>
      <div className="dark:from-purple-900/20 dark:via-violet-900/20 dark:to-indigo-900/30"></div>
      <div className="dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400"></div>
      <div className="dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"></div>
      <div className="dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70"></div>
      <div className="dark:shadow-slate-100/5 dark:hover:shadow-slate-100/10"></div>
      <div className="dark:bg-amber-900/30"></div>
      <div className="dark:from-slate-100 dark:to-slate-300"></div>
    </div>
  );
};