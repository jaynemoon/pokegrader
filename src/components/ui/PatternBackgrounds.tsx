import React from 'react';

interface PatternBackgroundProps {
  pattern?: 'dots' | 'lines' | 'diagonal' | 'grid' | 'plus';
  opacity?: number;
  className?: string;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({ 
  pattern = 'dots', 
  opacity = 0.03,
  className = ''
}) => {
  const patternId = `pattern-${pattern}-${Math.random().toString(36).substr(2, 9)}`;
  
  const getPattern = () => {
    switch (pattern) {
      case 'dots':
        return (
          <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" className="fill-slate-400 dark:fill-slate-500" opacity={opacity} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      
      case 'lines':
        return (
          <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" opacity={opacity} fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      
      case 'diagonal':
        return (
          <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M0 60L60 0M0 0L60 60" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.8" opacity={opacity} fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      
      case 'grid':
        return (
          <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0v32" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" opacity={opacity} fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      
      case 'plus':
        return (
          <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M16 0v32M0 16h32" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" opacity={opacity} fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return getPattern();
};

export default PatternBackground;