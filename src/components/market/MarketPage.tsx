import React, { useState } from 'react';
import Navigation from '../ui/Navigation';
import DottedBackground from '../ui/DottedBackground';
import Card from '../ui/Card';
import Button from '../ui/Button';
import type { User, SavedCard, ViewType, PriceAlert, MarketTrend } from '../../types';

interface MarketPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
  priceAlerts: PriceAlert[];
  setPriceAlerts: (alerts: PriceAlert[]) => void;
}

const MarketPage: React.FC<MarketPageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut,
  priceAlerts,
  setPriceAlerts
}) => {
  const [activeTab, setActiveTab] = useState<'trends' | 'alerts' | 'investment'>('trends');

  // Expanded mock market trends data
  const marketTrends: MarketTrend[] = [
    {
      cardName: 'Charizard Base Set Shadowless',
      set: 'Base Set',
      priceChange24h: 8.5,
      priceChangeWeek: -2.1,
      priceChangeMonth: 23.4,
      currentPrice: 8500,
      volume24h: 12
    },
    {
      cardName: 'Pikachu Illustrator PokeKyun',
      set: 'Promo',
      priceChange24h: 15.2,
      priceChangeWeek: 28.7,
      priceChangeMonth: 45.8,
      currentPrice: 42000,
      volume24h: 2
    },
    {
      cardName: 'Charizard Base Set Holo',
      set: 'Base Set',
      priceChange24h: 5.2,
      priceChangeWeek: -2.1,
      priceChangeMonth: 15.8,
      currentPrice: 1250,
      volume24h: 24
    },
    {
      cardName: 'Umbreon Gold Star',
      set: 'EX Power Keepers',
      priceChange24h: -3.8,
      priceChangeWeek: 12.4,
      priceChangeMonth: 18.2,
      currentPrice: 3200,
      volume24h: 5
    },
    {
      cardName: 'Lugia Neo Genesis 1st Edition',
      set: 'Neo Genesis',
      priceChange24h: 2.7,
      priceChangeWeek: 8.9,
      priceChangeMonth: 14.3,
      currentPrice: 2800,
      volume24h: 8
    },
    {
      cardName: 'Blastoise Base Set Holo',
      set: 'Base Set',
      priceChange24h: 2.4,
      priceChangeWeek: 4.7,
      priceChangeMonth: 9.1,
      currentPrice: 800,
      volume24h: 18
    },
    {
      cardName: 'Venusaur Base Set Holo',
      set: 'Base Set',
      priceChange24h: 1.8,
      priceChangeWeek: 6.2,
      priceChangeMonth: 12.5,
      currentPrice: 680,
      volume24h: 16
    },
    {
      cardName: 'Rayquaza Gold Star',
      set: 'EX Deoxys',
      priceChange24h: -2.1,
      priceChangeWeek: 15.6,
      priceChangeMonth: 22.8,
      currentPrice: 4500,
      volume24h: 3
    },
    {
      cardName: 'Pikachu VMAX Rainbow Rare',
      set: 'Vivid Voltage',
      priceChange24h: -1.8,
      priceChangeWeek: 8.4,
      priceChangeMonth: -5.2,
      currentPrice: 450,
      volume24h: 35
    },
    {
      cardName: 'Espeon Gold Star',
      set: 'EX Power Keepers',
      priceChange24h: 4.6,
      priceChangeWeek: 11.8,
      priceChangeMonth: 19.7,
      currentPrice: 2100,
      volume24h: 6
    },
    {
      cardName: 'Alakazam Base Set Holo',
      set: 'Base Set',
      priceChange24h: 0.8,
      priceChangeWeek: 3.4,
      priceChangeMonth: 7.9,
      currentPrice: 450,
      volume24h: 14
    },
    {
      cardName: 'Gyarados Base Set Holo',
      set: 'Base Set',
      priceChange24h: -0.5,
      priceChangeWeek: 2.1,
      priceChangeMonth: 5.8,
      currentPrice: 380,
      volume24h: 12
    }
  ];

  // Market summary data
  const marketSummary = {
    totalMarketCap: 2.8,
    avgPriceChange24h: 3.2,
    topGainer: 'Pikachu Illustrator PokeKyun',
    topGainerChange: 15.2,
    topLoser: 'Umbreon Gold Star',
    topLoserChange: -3.8,
    totalVolume: 155,
    activeListings: 8420
  };

  // Marketplace pricing data for popular Pokemon cards
  const marketplacePricing = [
    {
      cardName: 'Charizard Base Set Holo',
      grade: 9,
      prices: {
        ebay: { price: 1250, lastSold: '2 days ago', volume: 'High' },
        tcgplayer: { price: 1180, lastSold: '1 day ago', volume: 'High' },
        mercari: { price: 1200, lastSold: '3 days ago', volume: 'Medium' },
        cardmarket: { price: 1100, lastSold: '1 day ago', volume: 'High' },
        pricecharting: { price: 1220, trend: '+5.2%', volume: 'High' }
      }
    },
    {
      cardName: 'Charizard Base Set Shadowless',
      grade: 10,
      prices: {
        ebay: { price: 8500, lastSold: '1 day ago', volume: 'Medium' },
        tcgplayer: { price: 8200, lastSold: '2 days ago', volume: 'Medium' },
        mercari: { price: 8000, lastSold: '4 days ago', volume: 'Low' },
        cardmarket: { price: 7800, lastSold: '1 day ago', volume: 'Medium' },
        pricecharting: { price: 8300, trend: '+12.8%', volume: 'Medium' }
      }
    },
    {
      cardName: 'Umbreon Gold Star',
      grade: 9,
      prices: {
        ebay: { price: 3200, lastSold: '3 days ago', volume: 'Low' },
        tcgplayer: { price: 3100, lastSold: '5 days ago', volume: 'Low' },
        mercari: { price: 2950, lastSold: '1 week ago', volume: 'Very Low' },
        cardmarket: { price: 2800, lastSold: '2 days ago', volume: 'Low' },
        pricecharting: { price: 3150, trend: '+8.4%', volume: 'Low' }
      }
    },
    {
      cardName: 'Pikachu Illustrator',
      grade: 9,
      prices: {
        ebay: { price: 45000, lastSold: '1 week ago', volume: 'Very Low' },
        tcgplayer: { price: 42000, lastSold: '2 weeks ago', volume: 'Very Low' },
        mercari: { price: 40000, lastSold: '3 weeks ago', volume: 'Very Low' },
        cardmarket: { price: 38000, lastSold: '1 week ago', volume: 'Very Low' },
        pricecharting: { price: 44000, trend: '+15.2%', volume: 'Very Low' }
      }
    },
    {
      cardName: 'Lugia Neo Genesis 1st Edition',
      grade: 10,
      prices: {
        ebay: { price: 2800, lastSold: '2 days ago', volume: 'Medium' },
        tcgplayer: { price: 2650, lastSold: '1 day ago', volume: 'Medium' },
        mercari: { price: 2700, lastSold: '4 days ago', volume: 'Low' },
        cardmarket: { price: 2500, lastSold: '1 day ago', volume: 'Medium' },
        pricecharting: { price: 2750, trend: '+3.1%', volume: 'Medium' }
      }
    },
    {
      cardName: 'Espeon Gold Star',
      grade: 8,
      prices: {
        ebay: { price: 1800, lastSold: '1 day ago', volume: 'Low' },
        tcgplayer: { price: 1750, lastSold: '3 days ago', volume: 'Low' },
        mercari: { price: 1650, lastSold: '5 days ago', volume: 'Very Low' },
        cardmarket: { price: 1600, lastSold: '2 days ago', volume: 'Low' },
        pricecharting: { price: 1780, trend: '+6.7%', volume: 'Low' }
      }
    }
  ];


  const addPriceAlert = () => {
    const cardName = prompt('Enter card name:');
    const targetPrice = prompt('Enter target price:');
    const condition = confirm('Alert when price goes ABOVE target? (Cancel for BELOW)') ? 'above' : 'below';

    if (cardName && targetPrice) {
      const newAlert: PriceAlert = {
        id: Date.now(),
        cardName,
        targetPrice: parseFloat(targetPrice),
        condition,
        isActive: true,
        dateCreated: new Date().toISOString().split('T')[0]
      };
      setPriceAlerts([...priceAlerts, newAlert]);
    }
  };

  const toggleAlert = (id: number) => {
    setPriceAlerts(priceAlerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const removeAlert = (id: number) => {
    setPriceAlerts(priceAlerts.filter(alert => alert.id !== id));
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-slate-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return '↗';
    if (change < 0) return '↘';
    return '→';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      <DottedBackground opacity={0.02} />
      
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Market Intelligence</h1>
          <p className="text-slate-600 dark:text-slate-300">Track market trends, price alerts, and investment performance</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-slate-200 dark:bg-slate-700 p-1 rounded-lg w-fit">
          {[
            { id: 'trends', label: 'Prices' },
            { id: 'alerts', label: 'Alerts' },
            { id: 'investment', label: 'Marketplaces' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Market Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            {/* Market Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Market Cap</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">${marketSummary.totalMarketCap}B</p>
                  <p className={`text-xs font-medium ${getChangeColor(marketSummary.avgPriceChange24h)}`}>
                    {marketSummary.avgPriceChange24h > 0 ? '+' : ''}{marketSummary.avgPriceChange24h}% (24h)
                  </p>
                </div>
              </Card>
              
              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">24h Volume</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{marketSummary.totalVolume}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">sales across platforms</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Top Gainer</h3>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{marketSummary.topGainer}</p>
                  <p className={`text-xs font-medium ${getChangeColor(marketSummary.topGainerChange)}`}>
                    +{marketSummary.topGainerChange}%
                  </p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Listings</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{marketSummary.activeListings.toLocaleString()}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">across all platforms</p>
                </div>
              </Card>
            </div>

            {/* Filter and Sort Options */}
            <Card>
              <div className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 dark:text-slate-300">Sort by:</span>
                      <select className="text-sm border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 bg-white dark:bg-slate-800 dark:text-white">
                        <option>24h Change</option>
                        <option>Price</option>
                        <option>Volume</option>
                        <option>Market Cap</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 dark:text-slate-300">Filter:</span>
                      <select className="text-sm border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 bg-white dark:bg-slate-800 dark:text-white">
                        <option>All Sets</option>
                        <option>Base Set</option>
                        <option>Gold Stars</option>
                        <option>Modern</option>
                        <option>Vintage</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Showing {marketTrends.length} trending cards
                  </div>
                </div>
              </div>
            </Card>

            {/* Trending Cards Table */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Trending Pokemon Cards</h3>
                <div className="space-y-4">
                  {marketTrends.map((trend, index) => (
                    <div key={`${trend.cardName}-${trend.set}`} className="border-b border-slate-100 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="text-sm font-medium text-slate-400 w-6">
                            #{index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">{trend.cardName}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{trend.set}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-slate-900 dark:text-white">
                            ${trend.currentPrice.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{trend.volume24h} sales (24h)</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 mt-4 ml-10">
                        <div className="flex items-center">
                          <span className="text-sm text-slate-600 dark:text-slate-300 mr-2">24h:</span>
                          <span className={`flex items-center font-semibold ${getChangeColor(trend.priceChange24h)}`}>
                            {getChangeIcon(trend.priceChange24h)} {Math.abs(trend.priceChange24h).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-slate-600 dark:text-slate-300 mr-2">7d:</span>
                          <span className={`flex items-center font-semibold ${getChangeColor(trend.priceChangeWeek)}`}>
                            {getChangeIcon(trend.priceChangeWeek)} {Math.abs(trend.priceChangeWeek).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-slate-600 dark:text-slate-300 mr-2">30d:</span>
                          <span className={`flex items-center font-semibold ${getChangeColor(trend.priceChangeMonth)}`}>
                            {getChangeIcon(trend.priceChangeMonth)} {Math.abs(trend.priceChangeMonth).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-slate-600 dark:text-slate-300 mr-2">Vol:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            trend.volume24h > 20 ? 'bg-green-100 text-green-700' :
                            trend.volume24h > 10 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {trend.volume24h > 20 ? 'High' : trend.volume24h > 10 ? 'Medium' : 'Low'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Market Insights */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Market Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-3">🔥 Hot Categories</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Gold Star Cards</span>
                        <span className="text-sm font-semibold text-green-600">+18.4%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Base Set Holos</span>
                        <span className="text-sm font-semibold text-green-600">+12.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">1st Edition Cards</span>
                        <span className="text-sm font-semibold text-green-600">+9.7%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Japanese Exclusives</span>
                        <span className="text-sm font-semibold text-green-600">+15.2%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-3">📊 Market Analysis</h4>
                    <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                      <p>• Vintage cards continue to outperform modern releases</p>
                      <p>• PSA 10 grades showing 25% premium over PSA 9</p>
                      <p>• Japanese market influence growing significantly</p>
                      <p>• Holiday season driving increased collector activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Price Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Price Alerts</h3>
              <Button onClick={addPriceAlert} variant="primary">
                Add Alert
              </Button>
            </div>

            {priceAlerts.length === 0 ? (
              <Card>
                <div className="p-8 text-center">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">No price alerts set</p>
                  <Button onClick={addPriceAlert} variant="primary">
                    Create Your First Alert
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {priceAlerts.map((alert) => (
                  <Card key={alert.id}>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">{alert.cardName}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Alert when price goes {alert.condition} ${alert.targetPrice}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Created: {alert.dateCreated}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          alert.isActive 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}>
                          {alert.isActive ? 'Active' : 'Paused'}
                        </span>
                        <Button
                          onClick={() => toggleAlert(alert.id)}
                          variant="secondary"
                          size="sm"
                        >
                          {alert.isActive ? 'Pause' : 'Resume'}
                        </Button>
                        <Button
                          onClick={() => removeAlert(alert.id)}
                          variant="secondary"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Marketplace Prices Tab */}
        {activeTab === 'investment' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Where to Sell Your Pokemon Cards</h3>
              <p className="text-slate-600 dark:text-slate-300">Compare prices across major marketplaces for popular Pokemon cards</p>
            </div>

            <div className="space-y-6">
              {marketplacePricing.map((cardData, index) => (
                <Card key={index}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{cardData.cardName}</h4>
                        <p className="text-slate-600 dark:text-slate-300">Grade {cardData.grade} • PSA Certified</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* eBay */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">eB</span>
                          </div>
                          <h5 className="font-semibold text-slate-900 dark:text-white">eBay</h5>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">${cardData.prices.ebay.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Last sold: {cardData.prices.ebay.lastSold}</p>
                        <p className="text-xs text-blue-600 font-medium">Volume: {cardData.prices.ebay.volume}</p>
                      </div>

                      {/* TCGplayer */}
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">TC</span>
                          </div>
                          <h5 className="font-semibold text-slate-900">TCGplayer</h5>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">${cardData.prices.tcgplayer.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-600">Last sold: {cardData.prices.tcgplayer.lastSold}</p>
                        <p className="text-xs text-orange-600 font-medium">Volume: {cardData.prices.tcgplayer.volume}</p>
                      </div>

                      {/* Mercari */}
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">M</span>
                          </div>
                          <h5 className="font-semibold text-slate-900">Mercari</h5>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">${cardData.prices.mercari.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-600">Last sold: {cardData.prices.mercari.lastSold}</p>
                        <p className="text-xs text-red-600 font-medium">Volume: {cardData.prices.mercari.volume}</p>
                      </div>

                      {/* Cardmarket */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">CM</span>
                          </div>
                          <h5 className="font-semibold text-slate-900">Cardmarket</h5>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">€{Math.round(cardData.prices.cardmarket.price * 0.85).toLocaleString()}</p>
                        <p className="text-xs text-slate-600">Last sold: {cardData.prices.cardmarket.lastSold}</p>
                        <p className="text-xs text-purple-600 font-medium">Volume: {cardData.prices.cardmarket.volume}</p>
                      </div>

                      {/* PriceCharting */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">PC</span>
                          </div>
                          <h5 className="font-semibold text-slate-900">PriceCharting</h5>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">${cardData.prices.pricecharting.price.toLocaleString()}</p>
                        <p className={`text-xs font-medium ${
                          cardData.prices.pricecharting.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          Trend: {cardData.prices.pricecharting.trend}
                        </p>
                        <p className="text-xs text-green-600 font-medium">Volume: {cardData.prices.pricecharting.volume}</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <strong>Recommended:</strong> List on eBay for highest visibility and TCGplayer for trading card collectors. 
                        Consider Cardmarket for European buyers and PriceCharting for market trend analysis.
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Selling Tips */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Selling Tips & Best Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">📱 US Online Marketplaces</h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                      <li>• <strong>eBay:</strong> Largest audience, auction & buy-it-now options</li>
                      <li>• <strong>TCGplayer:</strong> Specialized TCG marketplace, lower fees</li>
                      <li>• <strong>Mercari:</strong> Easy selling, built-in shipping labels</li>
                      <li>• <strong>Facebook Groups:</strong> Local Pokemon card trading communities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">🌍 International Options</h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                      <li>• <strong>Cardmarket (EU):</strong> Europe's largest TCG marketplace</li>
                      <li>• <strong>Yahoo Auctions (Japan):</strong> Access to Japanese collectors</li>
                      <li>• <strong>COMC:</strong> Consignment service with global reach</li>
                      <li>• <strong>Heritage Auctions:</strong> High-end cards and collections</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

export default MarketPage;