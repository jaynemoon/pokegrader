import React from 'react';
import { ArrowBigRightIcon, Zap, RefreshCw, LucideCircleArrowOutUpRight, LucideArrowUpRight } from 'lucide-react';
import { usePokemonCards } from '../../hooks/usePokemonCards';
import PatternBackground from '../ui/PatternBackgrounds';

interface HeroSectionProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  fileInputRef,
  handleFileUpload
}) => {
  const { cards, loading, error, refreshCards } = usePokemonCards(4);
  return (
    <section className="relative">
      <PatternBackground pattern="dots" opacity={0.1} />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          Instant AI-Powered Grading
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
             The Ultimate Pokemon TCG Grade Tool
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get PSA-level grading in seconds using advanced AI analysis. Skip the months-long wait and expensive fees with our advanced AI analysis.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-blue-600/25 dark:shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-600/40 dark:hover:shadow-blue-500/40 hover:scale-105"
          >
            <LucideArrowUpRight className="w-5 h-5" />
            Get Started
          </button>
        </div>

        {/* Live Counter Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full">
            <Zap className="w-5 h-5 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Pokemon Cards Graded:</span>
              <span className="text-lg font-bold tabular-nums">789,664</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Random Pokemon Cards Section */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Recently Graded Cards</h3>
          </div>

          {error && (
            <div className="mb-4 text-center">
              <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                {error}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-slate-100 dark:bg-slate-800 rounded-xl aspect-[245/342] animate-pulse" />
              ))
            ) : (
              cards.map((card) => (
                <div
                  key={card.id}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[245/342] overflow-hidden">
                    <img
                      src={card.images.small}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='245' height='342' fill='%23E5E7EB'%3E%3Crect width='245' height='342' rx='12' fill='%23F3F4F6'/%3E%3Ctext x='122' y='180' text-anchor='middle' fill='%23374151' font-size='14' font-weight='bold'%3E${card.name}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <div className="font-semibold text-sm truncate">{card.name}</div>
                      <div className="text-xs opacity-90 truncate">{card.set.name}</div>
                      {card.rarity && (
                        <div className="text-xs opacity-75 mt-1">
                          <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                            {card.rarity}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
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
    </section>
  );
};

export default HeroSection;