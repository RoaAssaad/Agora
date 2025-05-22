import { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/UserService';
import { setToken } from '../utility/Utility';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/user/userSlice';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials.username, credentials.password);
      const token = response?.data?.access_token;
      const user = response?.data?.user;

      if (token && user) {
        setToken(token);
        dispatch(login(user)); //  Redux update

        alert('Login successful!');
        navigate('/home');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message || error);
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
                placeholder="Username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text onClick={togglePassword} role="button">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="w-100 btn-purple">
              Log In
            </Button>
          </Form>

          <p className="text-center mt-3">
            Don’t have an account?{' '}
            <span
              className="link-purple"
              onClick={() => navigate('/register')}
              role="button"
            >
              Register
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
