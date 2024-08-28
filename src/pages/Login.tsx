import React, { useState, FormEvent } from 'react';
import { useAuth } from '../components/AuthContextProvider';

export interface LoginPageProps {
  login: (email: string, password: string) => Promise<void>;
}

const LoginPage = ({ login }: LoginPageProps) => {
  console.log('on login page');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  //   const { login, isAuthenticated, user } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (err: unknown) {
      setError('Login failed. Please check your credentials.');
    }
  };

  //   if (isAuthenticated && user) {
  //     return <div>Welcome, {user.name}! You are logged in.</div>;
  //   }

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            // type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
