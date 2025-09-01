import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back button */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="text-slate-600 mt-2">
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
                <span className="px-2 bg-white text-slate-500">
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
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Trainer Account</h4>
            <p className="text-sm text-blue-700 mb-2">
              Try the app with our trainer account:
            </p>
            <div className="text-sm text-blue-600 space-y-1">
              <div>Email: demo@pokegrade.ai</div>
              <div>Password: pikapika</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;