import React, { useState } from 'react';
import Navigation from '../ui/Navigation';
import Card from '../ui/Card';
import Button from '../ui/Button';
import type { User, SavedCard, ViewType, PriceAlert, MarketTrend, InvestmentData, RecentSale } from '../../types';

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

  const investmentData: InvestmentData[] = savedCards.map((card, index) => ({
    cardId: card.id,
    purchasePrice: card.estimatedValue * (0.8 + Math.random() * 0.3),
    currentValue: card.estimatedValue,
    roi: ((card.estimatedValue / (card.estimatedValue * (0.8 + Math.random() * 0.3))) - 1) * 100,
    holdingPeriod: 30 + index * 15
  }));

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
    <div className="min-h-screen bg-slate-50">
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Market Intelligence</h1>
          <p className="text-slate-600">Track market trends, price alerts, and investment performance</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-slate-200 p-1 rounded-lg w-fit">
          {[
            { id: 'trends', label: 'Market Trends' },
            { id: 'alerts', label: 'Price Alerts' },
            { id: 'investment', label: 'Investment' },
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

        {/* Investment Tab */}
        {activeTab === 'investment' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-500">Total Investment</h3>
                  <p className="text-2xl font-bold text-slate-900">
                    ${investmentData.reduce((sum, item) => sum + item.purchasePrice, 0).toFixed(0)}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-500">Current Value</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ${investmentData.reduce((sum, item) => sum + item.currentValue, 0).toFixed(0)}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-500">Total ROI</h3>
                  <p className={`text-2xl font-bold ${
                    investmentData.reduce((sum, item) => sum + item.roi, 0) / investmentData.length > 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {((investmentData.reduce((sum, item) => sum + item.roi, 0) / investmentData.length) || 0).toFixed(1)}%
                  </p>
                </div>
              </Card>
            </div>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Investment Performance</h3>
                <div className="space-y-4">
                  {investmentData.map((investment) => {
                    const card = savedCards.find(c => c.id === investment.cardId);
                    return (
                      <div key={investment.cardId} className="border-b border-slate-100 pb-4 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-slate-900">{card?.cardName}</h4>
                            <p className="text-sm text-slate-600">Holding period: {investment.holdingPeriod} days</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-600">
                              ${investment.purchasePrice.toFixed(0)} → ${investment.currentValue.toFixed(0)}
                            </p>
                            <p className={`font-semibold ${getChangeColor(investment.roi)}`}>
                              {investment.roi > 0 ? '+' : ''}{investment.roi.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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