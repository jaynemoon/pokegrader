import React, { useState, useRef } from 'react';
import type { ViewType, User, SavedCard, GradeResults, AuthForm, AuthMode } from './types';
import HomePage from './components/home/HomePage';
import AnalysisPage from './components/grading/AnalysisPage';
import CollectionPage from './components/collection/CollectionPage';
import AuthPage from './components/auth/AuthPage';
import { generateMockPriceData } from './utils/mockData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [gradeResults, setGradeResults] = useState<GradeResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authForm, setAuthForm] = useState<AuthForm>({ email: '', password: '', name: '' });
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Simulate AI grading analysis
  const analyzeCard = async () => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const centering = Math.floor(Math.random() * 3) + 8;
    const corners = Math.floor(Math.random() * 3) + 7;
    const edges = Math.floor(Math.random() * 3) + 8;
    const surface = Math.floor(Math.random() * 2) + 8;
    
    const overallGrade = Math.min(centering, corners, edges, surface);
    const cardName = "Charizard Base Set Holo";
    const basePrice = overallGrade * 150 + Math.random() * 200;
    
    const results: GradeResults = {
      cardName,
      overallGrade,
      breakdown: {
        centering: { score: centering, description: centering >= 9 ? "Excellent" : "Good" },
        corners: { score: corners, description: corners >= 8 ? "Sharp" : "Slightly worn" },
        edges: { score: edges, description: edges >= 9 ? "Clean" : "Minor wear" },
        surface: { score: surface, description: surface >= 9 ? "Mint" : "Light scratches" }
      },
      estimatedValue: Math.round(basePrice),
      priceHistory: generateMockPriceData(basePrice),
      confidence: 87 + Math.floor(Math.random() * 10)
    };
    
    setGradeResults(results);
    setIsAnalyzing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setCurrentView('analysis');
      };
      reader.readAsDataURL(file);
    }
  };

  // Authentication functions
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: User = {
      id: Date.now(),
      email: authForm.email,
      name: authMode === 'signup' ? authForm.name : authForm.email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authForm.email}`
    };
    
    setUser(mockUser);
    setCurrentView('home');
    setIsAuthLoading(false);
    
    if (authMode === 'signin' && authForm.email === 'demo@pokegrade.ai') {
      setSavedCards([
        {
          id: 1,
          cardName: "Pikachu VMAX",
          overallGrade: 9,
          estimatedValue: 450,
          image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' fill='%23FFD700'%3E%3Crect width='200' height='280' rx='12' fill='%23000'/%3E%3Crect x='8' y='8' width='184' height='264' rx='8' fill='%23FFD700'/%3E%3Ctext x='100' y='140' text-anchor='middle' fill='%23000' font-size='16' font-weight='bold'%3EPikachu VMAX%3C/text%3E%3C/svg%3E",
          dateSaved: "12/15/2024",
          breakdown: {
            centering: { score: 9, description: "Excellent" },
            corners: { score: 9, description: "Sharp" },
            edges: { score: 9, description: "Clean" },
            surface: { score: 9, description: "Mint" }
          },
          priceHistory: generateMockPriceData(450),
          confidence: 92,
          userId: mockUser.id
        }
      ]);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setSavedCards([]);
    setCurrentView('home');
    setAuthForm({ email: '', password: '', name: '' });
  };

  const saveCard = () => {
    if (gradeResults && user) {
      const newCard: SavedCard = {
        id: Date.now(),
        ...gradeResults,
        image: uploadedImage!,
        dateSaved: new Date().toLocaleDateString(),
        userId: user.id
      };
      setSavedCards([...savedCards, newCard]);
      alert('Card saved to your collection!');
    } else if (!user) {
      alert('Please sign in to save cards to your collection.');
      setCurrentView('auth');
    }
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setGradeResults(null);
    setCurrentView('home');
  };

  const appProps = {
    currentView,
    setCurrentView,
    uploadedImage,
    gradeResults,
    isAnalyzing,
    savedCards,
    user,
    authForm,
    setAuthForm,
    authMode,
    setAuthMode,
    isAuthLoading,
    fileInputRef,
    cameraInputRef,
    analyzeCard,
    handleFileUpload,
    handleAuth,
    handleSignOut,
    saveCard,
    resetAnalysis
  };

  switch (currentView) {
    case 'home':
      return <HomePage {...appProps} />;
    case 'analysis':
      return <AnalysisPage {...appProps} />;
    case 'collection':
      return <CollectionPage {...appProps} />;
    case 'auth':
      return <AuthPage {...appProps} />;
    default:
      return <HomePage {...appProps} />;
  }
};

export default App;