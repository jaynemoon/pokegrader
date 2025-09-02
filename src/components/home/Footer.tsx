import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 dark:bg-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <a
            href="https://buymeacoffee.com/jaynemoon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 dark:text-slate-800"
            style={{ backgroundColor: '#ffedc7', border: '1px dashed #f76834' }}
          >
            ☕ Make Jayney a Poke Coffee
          </a>
        </div>
        <p className="dark:text-slate-400 text-sm">
          Built with ❤️ for Pokemon collectors everywhere
        </p>
      </div>
    </footer>
  );
};

export default Footer;