// src/components/LoginForm.jsx
import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';
/**
 * A standalone login form used inside styled containers.
 * Controlled with useState for `username` and `password`.
 * On submission, currently shows a success message and redirects.
 */
const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend login
    console.log('Logging in:', loginData);
    alert('Logged in successfully!');
    navigate('/');
  };

  return (
    <div className="bg-purple d-flex justify-content-center align-items-center vh-100">
      <Card className="form-card p-4">
        <h2 className="text-center mb-2">Sign In</h2>
        <h4 className="text-center text-purple fw-bold">Agora</h4>
        <p className="text-center text-muted small">
          Welcome back to the conversation.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100 btn-purple">
            Sign In
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don’t have an account?{' '}
          <span className="link-primary" onClick={() => navigate('/register')} role="button">
            Register
          </span>
        </p>
      </Card>
    </div>
  );
};

export default LoginForm;
