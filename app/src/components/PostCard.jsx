// src/components/PostCard.jsx
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <img src={post.image} alt="post" />
      <div className="post-body">
        <h5>{post.title}</h5>
        <p className="meta">{post.time} by <span>{post.user}</span> <br /> <span className="sub">{post.community}</span></p>
        <div className="engagement">
          <span>⬆ {post.votes}</span>
          <span>💬 {post.comments}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
