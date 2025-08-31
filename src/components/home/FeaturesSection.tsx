import React from 'react';
import { Shield, DollarSign, BarChart3, CheckCircle } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Analysis",
      description: "Professional PSA-style grading using advanced computer vision that analyzes centering, corners, edges, and surface condition.",
      badge: "Industry-standard accuracy",
      color: "from-blue-500 to-cyan-500",
      badgeColor: "text-blue-600"
    },
    {
      icon: DollarSign,
      title: "Real-Time Pricing",
      description: "Get instant market value estimates and selling price recommendations based on current market conditions.",
      badge: "Live market data",
      color: "from-emerald-500 to-teal-500",
      badgeColor: "text-emerald-600"
    },
    {
      icon: BarChart3,
      title: "Market Insights",
      description: "Track price history and market trends with interactive charts for informed buying and selling decisions.",
      badge: "30-day trend analysis",
      color: "from-purple-500 to-violet-500",
      badgeColor: "text-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Everything you need to grade and value your cards
          </h2>
          <p className="text-xl text-slate-600">
            Powered by cutting-edge AI technology and real-time market data
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200/50 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className={`flex items-center gap-2 text-sm ${feature.badgeColor} font-medium`}>
                <CheckCircle className="w-4 h-4" />
                {feature.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;