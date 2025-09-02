export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  isPro: boolean;
  freeAnalysesRemaining: number;
  subscriptionExpiresAt?: string;
}

export interface AuthForm {
  email: string;
  password: string;
  name: string;
}

export interface GradeBreakdown {
  score: number;
  description: string;
}

export interface CardGrade {
  centering: GradeBreakdown;
  corners: GradeBreakdown;
  edges: GradeBreakdown;
  surface: GradeBreakdown;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface GradeResults {
  cardName: string;
  overallGrade: number;
  breakdown: CardGrade;
  estimatedValue: number;
  priceHistory: PriceHistoryPoint[];
  confidence: number;
}

export interface SavedCard extends GradeResults {
  id: number;
  image: string;
  dateSaved: string;
  userId: number;
}

// Collection Management Types
export interface CollectionFilter {
  minGrade?: number;
  maxGrade?: number;
  minValue?: number;
  maxValue?: number;
  dateFrom?: string;
  dateTo?: string;
  cardName?: string;
  set?: string;
}

export interface CollectionSort {
  field: 'grade' | 'value' | 'date' | 'name';
  direction: 'asc' | 'desc';
}

export interface WishlistItem {
  id: number;
  cardName: string;
  set?: string;
  targetGrade?: number;
  maxPrice?: number;
  priority: 'low' | 'medium' | 'high';
  dateAdded: string;
}

export interface CollectionStats {
  totalCards: number;
  totalValue: number;
  averageGrade: number;
  gradeDistribution: { grade: number; count: number }[];
  topCards: SavedCard[];
}

// Market Intelligence Types
export interface PriceAlert {
  id: number;
  cardName: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  dateCreated: string;
}

export interface MarketTrend {
  cardName: string;
  set: string;
  priceChange24h: number;
  priceChangeWeek: number;
  priceChangeMonth: number;
  currentPrice: number;
  volume24h: number;
}

export interface InvestmentData {
  cardId: number;
  purchasePrice: number;
  currentValue: number;
  roi: number;
  holdingPeriod: number;
}

export interface RecentSale {
  cardName: string;
  grade: number;
  price: number;
  date: string;
  platform: string;
}

// Mobile Experience Types
export interface OfflineData {
  savedCards: SavedCard[];
  wishlist: WishlistItem[];
  lastSync: string;
}

export interface BarcodeScanResult {
  cardName: string;
  set: string;
  cardNumber: string;
  rarity: string;
}

export interface AROverlay {
  isActive: boolean;
  gradeInfo?: {
    estimatedGrade: number;
    confidence: number;
  };
}

export type ViewType = 'home' | 'analysis' | 'collection' | 'auth' | 'upgrade' | 'wishlist' | 'market' | 'settings' | 'support' | 'privacy' | 'terms' | 'features' | 'pricing';
export type AuthMode = 'signin' | 'signup';