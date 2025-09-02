import React from 'react';
import masterballIcon from '../../assets/masterball.svg';
import type { ViewType } from '../../types';

interface FooterProps {
  setCurrentView: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="py-12 sm:py-16 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <button 
                onClick={() => setCurrentView('home')}
                className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 hover:border-purple-800 hover:shadow-xlg rounded-lg border-radius-lg flex items-center justify-center">
                  <img
                    src={masterballIcon}
                    alt="PokéGrader-icon"
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-100 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  PokéGrader
                </span>
              </button>
              <p className="text-slate-400 hover:text-teal-500text-sm mb-6 max-w-xs sm:max-w-md">
                Professional AI-powered Pokemon card grading with instant results. Get PSA grades for trade price in seconds.
              </p>

              {/* Social media icons */}
              <div className="flex items-center space-x-6 mb-8">
                <a href="https://x.com/login" className="text-slate-400 hover:text-teal-500 transition-colors">
                  <span className="sr-only">X</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://discord.com/login" className="text-slate-400 hover:text-teal-500 transition-colors">
                  <span className="sr-only">Discord</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </a>
                <a href="https://www.reddit.com/login" className="text-slate-400 hover:text-teal-500transition-colors">
                  <span className="sr-only">Reddit</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product column */}
            <div className="mt-8 sm:mt-0">
              <h3 className="text-slate-400 hover:text-teal-500 font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentView('features')}
                    className="text-slate-400 hover:text-teal-500 transition-colors cursor-pointer"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('pricing')}
                    className="text-slate-400 hover:text-teal-500 transition-colors cursor-pointer"
                  >
                    Pricing
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => setCurrentView('mobile')}
                    className="text-slate-600 hover:text-slate-800 dark:text-cyan-100 dark:hover:text-white transition-colors duration-200"
                  >
                    Mobile App
                  </button>
                </li> */}
              </ul>
            </div>

            {/* Company column */}
            <div className="mt-8 sm:mt-0">
              <h3 className="text-slate-400 hover:text-teal-500font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentView('support')}
                    className="text-slate-400 hover:text-teal-500 transition-colors duration-200"
                  >
                    Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('privacy')}
                    className="text-slate-400 hover:text-teal-500 transition-colors duration-200"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('terms')}
                    className="text-slate-400 hover:text-teal-500 transition-colors duration-200" 
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-1 sm:px-1 lg:px-1 text-center mt-8 sm:mt-12 pt-8 border-t border-cyan-700 dark:border-cyan-700">
        <div className="m-4">
          <a
            href="https://buymeacoffee.com/jaynemoon?new=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 sm:px-2 py-2 rounded-lg font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 text-slate-800 bg-orange-200 hover:bg-orange-300 dark:text-slate-800 dark:bg-orange-200 dark:hover:bg-orange-300 text-sm xs:text-base"
            style={{ border: '3px solid #f76834' }}
          >
            Make Jayney a Pokémon Coffee!
          </a>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
          Built with ❤️ for Pokémon collectors everywhere
        </p>
      </div>
    </footer>
  );
};

export default Footer;