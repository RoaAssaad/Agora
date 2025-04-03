// src/components/PostCard.jsx
import { FaArrowUp, FaComment } from 'react-icons/fa';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {/* ✅ Conditionally show the image if it exists */}
      {post.image && (
        <img src={post.image} alt="Post visual" className="post-image" />
      )}

      <div className="post-body">
        <h5>{post.title}</h5>
        <p className="meta">
          {post.time} by <span>{post.user}</span> <br />
          <span className="sub">{post.community}</span>
        </p>
        <p>{post.content}</p>

        <div className="engagement">
          <span><FaArrowUp /> {post.votes}</span>
          <span><FaComment /> {post.comments}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
