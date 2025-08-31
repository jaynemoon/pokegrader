import React from 'react';
import { Camera, Upload, Zap } from 'lucide-react';

interface HeroSectionProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  fileInputRef,
  cameraInputRef,
  handleFileUpload
}) => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          Instant AI-Powered Grading
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Grade your{' '}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Pokemon cards
          </span>{' '}
          instantly
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Skip the months-long wait and expensive fees. Get professional PSA-style grading results in seconds using advanced AI analysis.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-slate-900/25 hover:shadow-xl hover:shadow-slate-900/40 hover:scale-105"
          >
            <Camera className="w-5 h-5" />
            Take Photo
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-semibold text-lg border border-slate-200 transition-all duration-200 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 hover:scale-105"
          >
            <Upload className="w-5 h-5" />
            Upload Image
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">&lt; 5s</div>
            <div className="text-slate-600">Grading time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">95%</div>
            <div className="text-slate-600">Accuracy rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">$0</div>
            <div className="text-slate-600">Grading fees</div>
          </div>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />
    </section>
  );
};

export default HeroSection;