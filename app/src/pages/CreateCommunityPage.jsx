// src/pages/CreateCommunityPage.jsx
import { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createCommunity } from '../services/CommunityService';
import './AuthPages.css';

const CreateCommunityPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', title: '', description: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCommunity(formData);
      alert('Community created!');
      navigate('/home');
    } catch (err) {
      alert('Failed to create community.');
    }
  };

  return (
    <div className="auth-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card p-4 w-100" style={{ maxWidth: '600px' }}>
          <h2 className="text-center mb-2">Create Community</h2>
          <h4 className="text-center text-purple fw-bold">Agora</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Community Name (e.g., reactjs)"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-purple">
              Create
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default CreateCommunityPage;
