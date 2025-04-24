// src/components/PostCard.jsx
import { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import { voteOnPost } from '../services/VoteService';
import { fetchCommentsByPost, createComment } from '../services/CommentService';
import './PostCard.css';
/**
 * Displays a single post with voting, comments, and content.
 * Props:
 *  - post: { id, title, content, image, time, user, community, votes, userVote }
 * Handles:
 *  - Upvote/Downvote logic with backend
 *  - Display + creation of comments
 */


const PostCard = ({ post }) => {
  const [voteCount, setVoteCount] = useState(post.votes);
  const [userVote, setUserVote] = useState(post.userVote || 0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      setLoadingComments(true);
      const res = await fetchCommentsByPost(post.id);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to load comments', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleVote = async (value) => {
    const newVote = userVote === value ? 0 : value;
    try {
      await voteOnPost(post.id, newVote);
      setUserVote(newVote);
      setVoteCount((prev) => prev + (newVote - userVote));
    } catch (err) {
      alert('Failed to vote.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await createComment(post.id, newComment);
      setNewComment('');
      loadComments();
    } catch (err) {
      alert('Failed to submit comment.');
    }
  };

  return (
    <div className="post-card">
      {post.image && <img src={post.image} alt="Post visual" className="post-image" />}

      <div className="post-body">
        <h5 className="post-title">{post.title}</h5>
        <p className="post-meta">
          {post.time} by <span className="post-user">{post.user}</span><br />
          <span className="post-community">{post.community}</span>
        </p>
        <p className="post-content">{post.content}</p>

        <div className="post-engagement">
          <button
            className={`vote-button ${userVote === 1 ? 'active' : ''}`}
            onClick={() => handleVote(1)}
          >
            <FaArrowUp /> {voteCount}
          </button>
          <button
            className={`vote-button ${userVote === -1 ? 'active' : ''}`}
            onClick={() => handleVote(-1)}
          >
            <FaArrowDown />
          </button>
          <span className="comment-count">
            <FaComment /> {comments.length}
          </span>
        </div>

        <div className="comment-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-button">Post</button>
          </form>

          <div className="comment-list">
            {loadingComments ? (
              <p className="text-muted small">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-muted small">No comments yet</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <span className="comment-author">{comment.user.username}</span>
                  {comment.content}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
