import React, { useState } from 'react';
import axios from 'axios';
import './write.css';

export default function Write() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/posts', { title, content, image }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTitle('');
      setContent('');
      setImage('');
    } catch (err) {
      console.error(err);
      setError('Error creating post. Please try again.');
    }
  };

  return (
    <div className='write'>
      <img className='writeImg' src="https://blog.depositphotos.com/wp-content/uploads/2017/07/Soothing-nature-backgrounds-2.jpg.webp" alt="Nature" />
      <form className='writeForm' onSubmit={handleSubmit}>
        {error && <span className="error">{error}</span>}
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <i className='writeIcon fas fa-plus'></i>
          </label>
          <input type='file' id='fileInput' style={{display: 'none'}} onChange={handleImageUpload} />
          <input 
            type='text' 
            placeholder='Title' 
            className='writeInput' 
            autoFocus={true} 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="writeFormGroup">
          <textarea 
            placeholder="Tell your story..." 
            type="text" 
            className="writeInput writeText" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
