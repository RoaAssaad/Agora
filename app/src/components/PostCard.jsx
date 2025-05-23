import { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import { useAppDispatch } from '../app/hooks';
import { voteOnPostThunk, setCommentCount } from '../features/posts/postSlice';
import { fetchCommentsByPost, createComment } from '../services/CommentService';
import './PostCard.css';

const PostCard = ({ post }) => {
  const dispatch = useAppDispatch();
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
      dispatch(setCommentCount({ postId: post.id, count: res.data.length }));
    } catch (err) {
      console.error('Failed to load comments', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleVote = (value) => {
    const newVote = post.userVote === value ? 0 : value;
    dispatch(voteOnPostThunk({ postId: post.id, value: newVote }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await createComment(post.id, newComment);
      setNewComment('');
      loadComments(); // Also updates Redux comment count
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
            className={`vote-button ${post.userVote === 1 ? 'active' : ''}`}
            onClick={() => handleVote(1)}
          >
            <FaArrowUp /> {post.votes}
          </button>
          <button
            className={`vote-button ${post.userVote === -1 ? 'active' : ''}`}
            onClick={() => handleVote(-1)}
          >
            <FaArrowDown />
          </button>
          <span className="comment-count">
            <FaComment /> {post.commentCount ?? 0}
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
