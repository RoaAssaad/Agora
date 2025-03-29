import { useState } from 'react';
import { Form, Button, Container, Card, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/UserService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthPages.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData.username, formData.email, formData.password);
      alert('Account created!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="auth-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card p-4">
          <h2 className="text-center mb-2">Create An Account</h2>
          <h4 className="text-center text-purple fw-bold">Agora</h4>
          <p className="text-center text-muted small">
            Where Conversations Thrive, Communities Connect, and Ideas Evolve.
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text onClick={togglePassword} role="button">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="w-100 btn-purple">Create Account</Button>
          </Form>

          <p className="text-center mt-3">
            Already have an account?{' '}
            <span className="link-purple" onClick={() => navigate('/login')} role="button">
              Log In
            </span>
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
