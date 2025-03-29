import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';
import { loginUser } from '../services/UserService';
import { setToken } from '../utility/Utility';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials.username, credentials.password);
      const token = response?.data?.access_token;
      if (token) {
        setToken(token);
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (err) {
      alert('Invalid credentials.');
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-wrapper">
        <Card className="auth-card p-4">
          <h2 className="text-center mb-2">Welcome Back</h2>
          <h3 className="text-center text-purple fw-bold">Agora</h3>
          <p className="text-center text-muted small">
            Where Conversations Thrive, Communities Connect, and Ideas Evolve.
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Email Address"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-purple">
              Log In
            </Button>
          </Form>

          <p className="text-center mt-3">
            Don’t have an account?{' '}
            <span className="link-purple" onClick={() => navigate('/register')} role="button">
              Register
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
