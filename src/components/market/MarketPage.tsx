import React, { useState } from 'react';
import Navigation from '../ui/Navigation';
import DottedBackground from '../ui/DottedBackground';
import Card from '../ui/Card';
import Button from '../ui/Button';
import type { User, SavedCard, ViewType, PriceAlert, MarketTrend, RecentSale } from '../../types';

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
  const [activeTab, setActiveTab] = useState<'trends' | 'alerts' | 'investment' | 'sales'>('trends');

  // Mock market data
  const marketTrends: MarketTrend[] = [
    {
      cardName: 'Charizard Base Set',
      set: 'Base Set',
      priceChange24h: 5.2,
      priceChangeWeek: -2.1,
      priceChangeMonth: 15.8,
      currentPrice: 1250,
      volume24h: 15
    },
    {
      cardName: 'Pikachu VMAX',
      set: 'Vivid Voltage',
      priceChange24h: -1.8,
      priceChangeWeek: 8.4,
      priceChangeMonth: -5.2,
      currentPrice: 450,
      volume24h: 32
    },
    {
      cardName: 'Blastoise Base Set',
      set: 'Base Set',
      priceChange24h: 2.4,
      priceChangeWeek: 4.7,
      priceChangeMonth: 9.1,
      currentPrice: 800,
      volume24h: 8
    }
  ];

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

  const recentSales: RecentSale[] = [
    { cardName: 'Charizard Base Set', grade: 9, price: 1200, date: '2024-01-15', platform: 'eBay' },
    { cardName: 'Pikachu VMAX', grade: 10, price: 520, date: '2024-01-14', platform: 'Heritage' },
    { cardName: 'Blastoise Base Set', grade: 8, price: 750, date: '2024-01-14', platform: 'PWCC' },
    { cardName: 'Venusaur Base Set', grade: 9, price: 680, date: '2024-01-13', platform: 'eBay' },
    { cardName: 'Alakazam Base Set', grade: 10, price: 450, date: '2024-01-13', platform: 'Heritage' }
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
    <div className="min-h-screen bg-slate-50 relative">
      <DottedBackground opacity={0.02} />
      
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Market Intelligence</h1>
          <p className="text-slate-600">Track market trends, price alerts, and investment performance</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-slate-200 p-1 rounded-lg w-fit">
          {[
            { id: 'trends', label: 'Market Trends' },
            { id: 'alerts', label: 'Price Alerts' },
            { id: 'investment', label: 'Marketplace Prices' },
            { id: 'sales', label: 'Recent Sales' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Market Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Trending Cards</h3>
                <div className="space-y-4">
                  {marketTrends.map((trend) => (
                    <div key={`${trend.cardName}-${trend.set}`} className="border-b border-slate-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-slate-900">{trend.cardName}</h4>
                          <p className="text-sm text-slate-600">{trend.set}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">${trend.currentPrice}</p>
                          <p className="text-xs text-slate-500">{trend.volume24h} sales (24h)</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-6 mt-3 text-sm">
                        <div className="flex items-center">
                          <span className="text-slate-600 mr-1">24h:</span>
                          <span className={`flex items-center ${getChangeColor(trend.priceChange24h)}`}>
                            {getChangeIcon(trend.priceChange24h)} {Math.abs(trend.priceChange24h).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-slate-600 mr-1">7d:</span>
                          <span className={`flex items-center ${getChangeColor(trend.priceChangeWeek)}`}>
                            {getChangeIcon(trend.priceChangeWeek)} {Math.abs(trend.priceChangeWeek).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-slate-600 mr-1">30d:</span>
                          <span className={`flex items-center ${getChangeColor(trend.priceChangeMonth)}`}>
                            {getChangeIcon(trend.priceChangeMonth)} {Math.abs(trend.priceChangeMonth).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Price Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Price Alerts</h3>
              <Button onClick={addPriceAlert} variant="primary">
                Add Alert
              </Button>
            </div>

            {priceAlerts.length === 0 ? (
              <Card>
                <div className="p-8 text-center">
                  <p className="text-slate-600 mb-4">No price alerts set</p>
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
                        <h4 className="font-medium text-slate-900">{alert.cardName}</h4>
                        <p className="text-sm text-slate-600">
                          Alert when price goes {alert.condition} ${alert.targetPrice}
                        </p>
                        <p className="text-xs text-slate-500">Created: {alert.dateCreated}</p>
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
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Where to Sell Your Pokemon Cards</h3>
              <p className="text-slate-600">Compare prices across major marketplaces for popular Pokemon cards</p>
            </div>

            <div className="space-y-6">
              {marketplacePricing.map((cardData, index) => (
                <Card key={index}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{cardData.cardName}</h4>
                        <p className="text-slate-600">Grade {cardData.grade} • PSA Certified</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* eBay */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">eB</span>
                          </div>
                          <h5 className="font-semibold text-slate-900">eBay</h5>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">${cardData.prices.ebay.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-600">Last sold: {cardData.prices.ebay.lastSold}</p>
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

                    <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">
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
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Selling Tips & Best Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">📱 US Online Marketplaces</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• <strong>eBay:</strong> Largest audience, auction & buy-it-now options</li>
                      <li>• <strong>TCGplayer:</strong> Specialized TCG marketplace, lower fees</li>
                      <li>• <strong>Mercari:</strong> Easy selling, built-in shipping labels</li>
                      <li>• <strong>Facebook Groups:</strong> Local Pokemon card trading communities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">🌍 International Options</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
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

        {/* Recent Sales Tab */}
        {activeTab === 'sales' && (
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Sales</h3>
              <div className="space-y-4">
                {recentSales.map((sale, index) => (
                  <div key={index} className="border-b border-slate-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-slate-900">{sale.cardName}</h4>
                        <p className="text-sm text-slate-600">Grade {sale.grade} • {sale.platform}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${sale.price}</p>
                        <p className="text-xs text-slate-500">{sale.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MarketPage;