// This component exists solely to force Tailwind CSS to include dark mode classes
// It should never be rendered in the actual app
export const DarkModeClasses = () => {
  return (
    <div className="hidden">
      {/* Force include all dark mode classes used in the app */}
      <div className="dark:bg-slate-900"></div>
      <div className="dark:text-white"></div>
      <div className="dark:text-blue-400"></div>
      <div className="dark:border-slate-700"></div>
      <div className="dark:hover:bg-slate-800"></div>
      <div className="dark:hover:text-slate-100"></div>
      <div className="dark:from-blue-900/20"></div>
      <div className="dark:from-purple-900/20 dark:via-violet-900/20 dark:to-indigo-900/30"></div>
      <div className="dark:via-purple-400"></div>
      <div className="dark:from-blue-500"></div>
      <div className="dark:shadow-slate-900/50"></div>
      <div className="dark:shadow-slate-100/5"></div>
      <div className="dark:bg-amber-900/30"></div>
      <div className="dark:from-slate-100"></div>
      {/* Newsletter and Pricing Section Classes */}
      <div className="dark:bg-slate-800/60"></div>
      <div className="dark:from-blue-900/20"></div>
      <div className="dark:from-blue-800/20"></div>
      <div className="dark:bg-blue-900/30"></div>
    </div>
  );
};