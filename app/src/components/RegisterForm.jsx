// src/components/RegisterForm.jsx
import { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css'; // We'll style the form here

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend registration
    console.log('Submitted:', formData);
    alert('Account created successfully!');
    navigate('/login');
  };

  return (
    <div className="bg-purple d-flex justify-content-center align-items-center vh-100">
      <Card className="form-card p-4">
        <h2 className="text-center mb-2">Create An Account</h2>
        <h4 className="text-center text-purple fw-bold">Agora</h4>
        <p className="text-center text-muted small">
          Where Conversations Thrive, Communities Connect, and Ideas Evolve.
        </p>

        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100 btn-purple">
            Create Account
          </Button>
        </Form>

        <p className="text-center mt-3">
          Already have an account?{' '}
          <span className="link-primary" onClick={() => navigate('/login')} role="button">
            Sign In
          </span>
        </p>
      </Card>
    </div>
  );
};

export default RegisterForm;
