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

export type ViewType = 'home' | 'analysis' | 'collection' | 'auth' | 'upgrade';
export type AuthMode = 'signin' | 'signup';