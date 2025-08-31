import React from 'react';
import type { ViewType, AuthForm, AuthMode } from '../../types';

interface AuthPageProps {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  authForm: AuthForm;
  setAuthForm: (form: AuthForm) => void;
  handleAuth: (e: React.FormEvent) => void;
  setCurrentView: (view: ViewType) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({
  authMode,
  setAuthMode: _setAuthMode,
  authForm: _authForm,
  setAuthForm: _setAuthForm,
  handleAuth: _handleAuth,
  setCurrentView: _setCurrentView
}) => {
  return (
    <div>
      <h1>Auth Page</h1>
      <p>Mode: {authMode}</p>
    </div>
  );
};

export default AuthPage;