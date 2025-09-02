import { useState, useEffect, useCallback } from 'react';

interface PokemonCard {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    name: string;
    series: string;
  };
  rarity?: string;
  market?: {
    prices?: {
      holofoil?: {
        market?: number;
      };
      normal?: {
        market?: number;
      };
    };
  };
}

interface PokemonCardResponse {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

const fallbackCards: PokemonCard[] = [
  {
    id: 'base1-4',
    name: 'Charizard',
    images: {
      small: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="245" height="342" fill="%23FF6B35"%3E%3Crect width="245" height="342" rx="12" fill="%23FF6B35"/%3E%3Ctext x="122" y="180" text-anchor="middle" fill="white" font-size="16" font-weight="bold"%3ECharizard%3C/text%3E%3C/svg%3E',
      large: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="245" height="342" fill="%23FF6B35"%3E%3Crect width="245" height="342" rx="12" fill="%23FF6B35"/%3E%3Ctext x="122" y="180" text-anchor="middle" fill="white" font-size="16" font-weight="bold"%3ECharizard%3C/text%3E%3C/svg%3E'
    },
    set: {
      name: 'Base Set',
      series: 'Base'
    },
    rarity: 'Rare Holo'
  },
  {
    id: 'base1-1',
    name: 'Blastoise',
    images: {
      small: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="245" height="342" fill="%234A90E2"%3E%3Crect width="245" height="342" rx="12" fill="%234A90E2"/%3E%3Ctext x="122" y="180" text-anchor="middle" fill="white" font-size="16" font-weight="bold"%3EBlastoise%3C/text%3E%3C/svg%3E',
      large: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="245" height="342" fill="%234A90E2"%3E%3Crect width="245" height="342" rx="12" fill="%234A90E2"/%3E%3Ctext x="122" y="180" text-anchor="middle" fill="white" font-size="16" font-weight="bold"%3EBlastoise%3C/text%3E%3C/svg%3E'
    },
    set: {
      name: 'Base Set',
      series: 'Base'
    },
    rarity: 'Rare Holo'
  },
  {
    id: 'base1-15',
    name: 'Venusaur',
    images: {
      small: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="245" height="342" fill="%2350C878"%3E%3Crect width="245" height="342" rx="12" fill="%2350C878"/%3E%3Ctext x="122" y="180" text-anchor="middle" fill="white" font-size="16" font-weight="bold"%3EVenusaur%3C/text%3E%3C/svg%3E',
      large: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="245" height="342" fill="%2350C878"%3E%3Crect width="245" height="342" rx="12" fill="%2350C878"/%3E%3Ctext x="122" y="180" text-anchor="middle" fill="white" font-size="16" font-weight="bold"%3EVenusaur%3C/text%3E%3C/svg%3E'
    },
    set: {
      name: 'Base Set',
      series: 'Base'
    },
    rarity: 'Rare Holo'
  },
  {
    id: 'base1-25',
    name: 'Pikachu',
    images: {
      small: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="245" height="342" fill="%23FFD700"%3E%3Crect width="245" height="342" rx="12" fill="%23FFD700"/%3E%3Ctext x="122" y="180" text-anchor="middle" fill="black" font-size="16" font-weight="bold"%3EPikachu%3C/text%3E%3C/svg%3E',
      large: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="245" height="342" fill="%23FFD700"%3E%3Crect width="245" height="342" rx="12" fill="%23FFD700"/%3E%3Ctext x="122" y="180" text-anchor="middle" fill="black" font-size="16" font-weight="bold"%3EPikachu%3C/text%3E%3C/svg%3E'
    },
    set: {
      name: 'Base Set',
      series: 'Base'
    },
    rarity: 'Common'
  }
];

// Define the rarest Pokemon card rarities based on Pokemon TCG hierarchy
const rarestRarities = [
  'Rare Secret',
  'Rare Rainbow',
  'Amazing Rare',
  'Rare Shiny',
  'Rare Shiny GX',
  'Rare Holo VMAX',
  'Rare Ultra',
  'Rare Prime',
  'LEGEND',
  'Rare Holo ex',
  'Rare Holo LV.X',
  'Rare ACE'
];

export const usePokemonCards = (cardCount: number = 4) => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRarestCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // First, fetch available rarities from the API to get the most current list
      let availableRarities: string[] = [];
      try {
        const raritiesResponse = await fetch('https://api.pokemontcg.io/v2/rarities');
        if (raritiesResponse.ok) {
          const raritiesData = await raritiesResponse.json();
          availableRarities = raritiesData.data || [];
        }
      } catch (raritiesError) {
        console.warn('Failed to fetch rarities, using predefined list:', raritiesError);
      }

      // Find the rarest rarities that exist in the API
      const targetRarities = rarestRarities.filter(rarity => 
        availableRarities.length === 0 || availableRarities.includes(rarity)
      ).slice(0, 3); // Take top 3 rarest rarities

      // If no rare rarities found, add some backup options
      if (targetRarities.length === 0) {
        targetRarities.push('Rare Holo', 'Rare', 'Promo');
      }

      // Build query for rarest cards
      const rarityQuery = targetRarities.map(rarity => `rarity:"${rarity}"`).join(' OR ');
      
      // Generate random page to get variety
      const randomPage = Math.floor(Math.random() * 10) + 1; // Smaller range for rare cards
      
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=20&q=(${rarityQuery})`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch rare Pokemon cards');
      }

      const data: PokemonCardResponse = await response.json();
      
      if (data.data && data.data.length > 0) {
        // Filter out cards without images and shuffle
        const validCards = data.data.filter(card => 
          card.images && card.images.small && card.images.small.trim() !== ''
        );
        
        if (validCards.length > 0) {
          const shuffledCards = validCards.sort(() => 0.5 - Math.random()).slice(0, cardCount);
          setCards(shuffledCards);
          return;
        }
      }
      
      throw new Error('No valid rare cards found');
    } catch (err) {
      console.warn('Failed to fetch rare cards from Pokemon TCG API, using fallback cards:', err);
      // Use fallback cards and shuffle them
      const shuffledFallback = [...fallbackCards].sort(() => 0.5 - Math.random()).slice(0, cardCount);
      setCards(shuffledFallback);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [cardCount]);

  const refreshCards = () => {
    fetchRarestCards();
  };

  useEffect(() => {
    fetchRarestCards();
  }, [fetchRarestCards]);

  return {
    cards,
    loading,
    error,
    refreshCards
  };
};