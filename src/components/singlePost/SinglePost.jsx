import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SinglePost.css';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
        setLoading(false); // Update loading state after fetching post
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Error fetching post. Please try again.');
        setLoading(false); // Update loading state in case of error
      }
    };
    fetchPost();
  }, [id]);

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
      console.error(err); // Log the error for debugging
      setError('Error commenting on post. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display specific error message if there's an error
  }

  if (!post) {
    return <div>Post not found.</div>; // Handle case where post is not found
  }

  return (
    <div className="singlePost">
      <div className="singlePostImg">
      <img className="singlePostImage" src={post.image} alt={post.title} />
      </div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
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
