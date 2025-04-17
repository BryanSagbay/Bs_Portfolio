// pages/LoginPage.tsx
import { FC } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: FC<LoginPageProps> = ({ onLoginSuccess }) => {
  return (
    <div className="login-page">
      <h1>Bienvenido</h1>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default LoginPage;