import type { PriceHistoryPoint } from '../types';

export const generateMockPriceData = (basePrice: number): PriceHistoryPoint[] => {
  const data: PriceHistoryPoint[] = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.3;
    data.push({
      date: date.toLocaleDateString(),
      price: Math.max(basePrice * (1 + variation), basePrice * 0.5)
    });
  }
  return data;
};



export const DEMO_CARD_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' fill='%23FFD700'%3E%3Crect width='200' height='280' rx='12' fill='%23000'/%3E%3Crect x='8' y='8' width='184' height='264' rx='8' fill='%23FFD700'/%3E%3Ctext x='100' y='140' text-anchor='middle' fill='%23000' font-size='16' font-weight='bold'%3EPikachu VMAX%3C/text%3E%3C/svg%3E";

export const DEMO_USER_EMAIL = 'demo@pokegrade.ai';
export const DEMO_PASSWORD = 'pikapika';