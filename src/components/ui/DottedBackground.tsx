import React from 'react';

interface DottedBackgroundProps {
  className?: string;
  opacity?: number;
}

const DottedBackground: React.FC<DottedBackgroundProps> = ({ 
  className = "", 
  opacity = 0.4 
}) => {
  // SVG pattern inspired by Hero Patterns
  const dottedPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='${opacity}' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: dottedPattern,
        backgroundSize: '20px 20px'
      }}
    />
  );
};

export default DottedBackground;