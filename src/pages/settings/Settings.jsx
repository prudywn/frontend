// Settings.js
import './settings.css';
import React, { useState, useEffect } from 'react';
import { useUser } from '../../components/contexts/UserContext';
import axios from 'axios';

export default function Settings() {
  const { userData, updateUser } = useUser();
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    password: '',
    profilePic: null,
    profilePicPreview: userData.profilePic
  });

  useEffect(() => {
    if (userData.profilePic){
      setFormData((prevData) => ({...prevData, profilePicPreview: userData.profilePic}));
    }
  }, [userData.profilePic]);

  const [likedImages, setLikedImages] = useState([]);
  const [favoriteImages, setFavoriteImages] = useState([]);

  useEffect(() => {
    const storedLikedImages = localStorage.getItem('likedImages');
    const storedFavoriteImages = localStorage.getItem('favoriteImages');

    if (storedLikedImages) {
      setLikedImages(JSON.parse(storedLikedImages));
    }

    if (storedFavoriteImages) {
      setFavoriteImages(JSON.parse(storedFavoriteImages));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic' && files[0]) {
      setFormData({
        ...formData,
        profilePic: files[0],
        profilePicPreview: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser({
      username: formData.username,
      email: formData.email,
      profilePic: formData.profilePicPreview,
    });

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const data = new FormData();
    if (formData.username) data.append('username', formData.username);
    if (formData.email) data.append('email', formData.email);
    if (formData.password) data.append('password', formData.password);
    if (formData.profilePic) data.append('profilePic', formData.profilePic);

    try {
      await axios.put('http://localhost:5000/user/update', data, config);
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <div>
        <img src='https://blog.depositphotos.com/wp-content/uploads/2017/07/Soothing-nature-backgrounds-2.jpg.webp' alt="" style={{ width: '70%', margin: '10px', padding: '10px' }} />
      </div>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture
              <input type="file" name="profilePic" accept='image/*' onChange={handleChange} />
            </label>
            {formData.profilePicPreview && (
              <div className="settingsProfile">
                <img src={formData.profilePicPreview} alt="profilePic" style={{ width: '100px', height: '100px' }} />
                <label htmlFor="fileInput">
                  <i className=" settingsProfilePicIcon fas fa-user-circle"></i>
                </label>
                <input type="file" id='fileInput' style={{ display: 'none' }} />
              </div>
            )}
            <label htmlFor="username">Username</label>
            <input value={formData.username} name='username' type="text" placeholder='Your name...' onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input value={formData.email} name='email' type="email" placeholder='Your email...' onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input value={formData.password} name='password' type="password" onChange={handleChange} />
            <div>
              <h2>Liked Images</h2>
              <ul>
                {likedImages.map((image, index) => (
                  <li key={index}>
                    <img src={image} alt={`Liked Image ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                  </li>
                ))}
              </ul>
              <h2>Favorite Images</h2>
              <ul>
                {favoriteImages.map((image, index) => (
                  <li key={index}>
                    <img src={image} alt={`Favorite Image ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                  </li>
                ))}
              </ul>
            </div>
            <button className='settingsSubmit'>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
