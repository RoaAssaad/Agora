// src/pages/PostForm.jsx
import { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/PostService';
import { useCommunities } from '../context/CommunityContext';
import '../pages/AuthPages.css';

const PostForm = () => {
  const navigate = useNavigate();
  const { communities } = useCommunities();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    communityId: '',
    image: '', // new field
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file); // convert to base64
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(formData);
      alert('Post submitted successfully!');
      navigate('/home');
    } catch (err) {
      alert('Failed to submit post. Please try again.');
    }
  };

  return (
    <div className="auth-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card p-4 w-100" style={{ maxWidth: '600px' }}>
          <h2 className="text-center mb-2">Create Post</h2>
          <h4 className="text-center text-purple fw-bold">Agora</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Post Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Post Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                name="communityId"
                value={formData.communityId}
                onChange={handleChange}
                required
              >
                <option value="">Select a Community</option>
                {communities.map((c) => (
                 <option key={c.id} value={c.id}>
                 /c/{c.name}
               </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-purple">
              Submit Post
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default PostForm;
