import { useState, FormEvent } from 'react';
import { Input } from '../components/Input';
import './Login.css';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
export interface LoginPageProps {
  login: (email: string, password: string) => Promise<void>;
}

const LoginPage = ({ login }: LoginPageProps) => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await login(name, password);
    } catch (err: unknown) {
      setError(`Error: ${err}`);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {/* {error && <p className="error">{error}</p>} */}
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          name="name"
          label="Username:"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          name="password"
          label="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant={'primary'}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
