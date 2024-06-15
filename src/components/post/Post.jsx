import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Post.css';

import { useDarkMode } from '../contexts/DarkModeContext';


import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';



export default function Post() {
  const { id } = useParams(); // Get post ID from URL if available
  const { isDarkMode } = useDarkMode();
  const modeClass = isDarkMode ? 'dark' : '';
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); // For single post view
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [liked, setLiked] = useState(false); // State to track if the user has liked the post

  useEffect(() => {
    if (id) {
      // If there's an ID in the URL, fetch single post
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/posts/${id}`);
          setPost(response.data);
          setLoading(false);

          // Check if the user has already liked the post
          const userId = JSON.parse(localStorage.getItem('user'))._id;
          setLiked(response.data.likes.includes(userId));
        } catch (err) {
          console.error(err);
          setError('Error fetching post. Please try again.');
          setLoading(false);
        }
      };
      fetchPost();
    } else {
      // Otherwise, fetch all posts
      const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/posts');
          setPosts(response.data);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError('Error fetching posts. Please try again.');
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [id]);

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      const url = liked ? `http://localhost:5000/posts/${postId}/unlike` : `http://localhost:5000/posts/${postId}/like`;
      await axios.post(url, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLiked(!liked);
      if (id) {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
      } else {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      }
    } catch (err) {
      console.error(err);
      setError('Error updating like. Please try again.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/posts/${id}/comment`, { text: comment }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComment('');
      const response = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(response.data);
    } catch (err) {
      console.error(err);
      setError('Error commenting on post. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (id && post) {
    return (
      <div className={`singlePost ${modeClass}`}>
        {error && <span className="error">{error}</span>}
        <img className="singlePostImage" src={post.image} alt={post.title} />
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <button onClick={() => handleLike(post._id)}>
          <FontAwesomeIcon icon={liked ? faThumbsDown : faThumbsUp} /> {liked ? 'Unlike' : 'Like'} {post.likes.length}
        </button>
        <div className="commentsSection">
          <h3>Comments</h3>
          {post.comments.map(comment => (
            <p key={comment._id}><strong>{comment.user.username}:</strong> {comment.text}</p>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Add a comment..." 
            required 
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`post ${modeClass}`}>
      {error && <span className="error">{error}</span>}
      <div className="image-gallery">
        {posts.map((post) => (
          <div key={post._id}>
            <img className="images" src={post.image} alt={post.title} />
            <span className="title">{post.title}</span>
            <p className="tag">{post.content.substring(0, 100)}...</p>
            <button onClick={() => handleLike(post._id)}>
              <FontAwesomeIcon icon={liked ? faThumbsDown : faThumbsUp} /> {liked ? 'Unlike' : 'Like'} {post.likes}
            </button>
            <Link to={`/post/${post._id}`} className='read'>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
