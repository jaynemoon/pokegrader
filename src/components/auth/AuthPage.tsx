import React from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import DottedBackground from '../ui/DottedBackground';
import pikaImage from '../../assets/pika.png';
import masterballIcon from '../../assets/masterball.svg';
import type { ViewType, AuthForm, AuthMode } from '../../types';

interface AuthPageProps {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  authForm: AuthForm;
  setAuthForm: (form: AuthForm) => void;
  handleAuth: (e: React.FormEvent) => void;
  isAuthLoading: boolean;
  setCurrentView: (view: ViewType) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({
  authMode,
  setAuthMode,
  authForm,
  setAuthForm,
  handleAuth,
  isAuthLoading,
  setCurrentView
}) => {
  const handleInputChange = (field: keyof AuthForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthForm({ ...authForm, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative transition-colors">
      <DottedBackground opacity={0.02} />
      
      {/* PokéGrader Logo */}
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 hover:border-purple-800 hover:shadow-xl rounded-lg flex items-center justify-center">
            <img
              src={masterballIcon}
              alt="PokéGrader-icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            PokéGrader
          </span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          {/* Pika Image */}
          <div className="flex justify-center mb-6">
            <img 
              src={pikaImage} 
              alt="Pikachu" 
              className="w-24 h-24 object-contain drop-shadow-xl animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 transition-colors">
            {authMode === 'signin' 
              ? 'Welcome back to PokéGrader' 
              : 'Create your PokéGrader account'
            }
          </p>
        </div>

        <Card>
          <form onSubmit={handleAuth} className="space-y-6">
            {authMode === 'signup' && (
              <Input
                label="Full Name"
                type="text"
                value={authForm.name}
                onChange={handleInputChange('name')}
                placeholder="Enter your full name"
                required
              />
            )}

            <Input
              label="Email Address"
              type="email"
              value={authForm.email}
              onChange={handleInputChange('email')}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={authForm.password}
              onChange={handleInputChange('password')}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              loading={isAuthLoading}
              className="w-full"
              size="lg"
            >
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Google Sign In Button */}
          {authMode === 'signin' && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  // Google sign-in logic would go here
                  console.log('Google sign-in clicked');
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
                  {authMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="w-full"
              >
                {authMode === 'signin' ? 'Create Account' : 'Sign In Instead'}
              </Button>
            </div>
          </div>

          {/* Demo account info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-lg transition-colors">
            <h4 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2">✨ Trainer Account</h4>
            <div className="text-sm text-purple-600 dark:text-purple-400 space-y-1 font-mono">
              <div>📧 Email: demo@pokegrade.ai</div>
              <div>🔑 Password: pikapika</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;