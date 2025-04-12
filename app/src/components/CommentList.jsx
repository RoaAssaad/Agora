// src/components/CommentList.jsx
import { useEffect, useState } from 'react';
import { fetchCommentsByPost, createComment } from '../services/CommentService';
import './PostCard.css'; // reuse styles

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const res = await fetchCommentsByPost(postId);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await createComment(postId, newComment);
      setNewComment('');
      loadComments();
    } catch (err) {
      alert('Failed to post comment.');
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          className="comment-input"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="comment-button">Post</button>
      </form>

      <div className="comment-list">
        {loading ? (
          <p className="text-muted small">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-muted small">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <span className="comment-author">{comment.user.username}</span>
              <div>{comment.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
