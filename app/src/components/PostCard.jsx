import { FaArrowUp, FaComment } from 'react-icons/fa';
import './PostCard.css';

const PostCard = ({ post }) => {
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
          <span><FaArrowUp /> {post.votes}</span>
          <span><FaComment /> {post.comments}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
