import { FC } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: FC<LoginPageProps> = ({ onLoginSuccess }) => {
  return (
    <div className="login-page">
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default LoginPage;