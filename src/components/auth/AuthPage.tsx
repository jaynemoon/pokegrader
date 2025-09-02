import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import DottedBackground from '../ui/DottedBackground';
import pikaImage from '../../assets/pika.png';
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
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back button */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

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
            <p className="text-sm text-purple-700 dark:text-purple-400 mb-2">
              Try the app with our trainer account:
            </p>
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