import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDarkMode } from "../../components/contexts/DarkModeContext";
import './explore.css';

function About() {
  const { isDarkMode } = useDarkMode();
  const modeClass = isDarkMode ? 'dark' : '';
  const [images, setImages] = useState([]);
  const [records, setRecords] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [comments, setComments] = useState({});
  const [favoriteImages, setFavoriteImages] = useState([]);
  
  const [followedAuthors, setFollowedAuthors] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});

  // Load data from local storage on component mount
  useEffect(() => {
    const storedLikedImages = localStorage.getItem('likedImages');
    const storedFavoriteImages = localStorage.getItem('favoriteImages');
    const storedFollowedAuthors = localStorage.getItem('followedAuthors');
    const storedLikeCounts = localStorage.getItem('likeCounts');

    if (storedLikedImages) {
      setLikedImages(JSON.parse(storedLikedImages));
    }

    if (storedFavoriteImages) {
      setFavoriteImages(JSON.parse(storedFavoriteImages));
    }

    if (storedFollowedAuthors) {
      setFollowedAuthors(JSON.parse(storedFollowedAuthors));
    }

    if (storedLikeCounts) {
      setLikeCounts(JSON.parse(storedLikeCounts));
    }
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            key: '44064749-a1cdae01a16067c7f42c496ed',
            q: 'travel+landscape',
            image_type: 'photo',
            per_page: 50
          },
        });
        const imagesWithAuthors = response.data.hits.map(image => ({
          ...image,
          author: generateRandomAuthor(),
        }));
        setImages(imagesWithAuthors);
        setRecords(imagesWithAuthors);

        // Initialize like counts if not already set
        const initialLikeCounts = {};
        imagesWithAuthors.forEach(image => {
          if (!likeCounts[image.id]) {
            initialLikeCounts[image.id] = 0;
          }
        });
        setLikeCounts(prevCounts => ({ ...prevCounts, ...initialLikeCounts }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchImages();
  }, []);

  const generateRandomAuthor = () => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah"];
    return names[Math.floor(Math.random() * names.length)];
  }

  const toggleLike = (imageId) => {
    const updatedLikedImages = likedImages.includes(imageId)
      ? likedImages.filter(id => id !== imageId)
      : [...likedImages, imageId];

    setLikedImages(updatedLikedImages);
    localStorage.setItem('likedImages', JSON.stringify(updatedLikedImages));

    const updatedLikeCounts = { ...likeCounts };
    if (likedImages.includes(imageId)) {
      updatedLikeCounts[imageId] -= 1;
    } else {
      updatedLikeCounts[imageId] += 1;
    }
    setLikeCounts(updatedLikeCounts);
    localStorage.setItem('likeCounts', JSON.stringify(updatedLikeCounts));
  }

  const toggleFavorite = (imageId) => {
    const updatedFavoriteImages = favoriteImages.includes(imageId)
      ? favoriteImages.filter(id => id !== imageId)
      : [...favoriteImages, imageId];

    setFavoriteImages(updatedFavoriteImages);
    localStorage.setItem('favoriteImages', JSON.stringify(updatedFavoriteImages));
  }

  const toggleFollow = (author) => {
    const updatedFollowedAuthors = followedAuthors.includes(author)
      ? followedAuthors.filter(name => name !== author)
      : [...followedAuthors, author];

    setFollowedAuthors(updatedFollowedAuthors);
    localStorage.setItem('followedAuthors', JSON.stringify(updatedFollowedAuthors));
  }

  const getInputData = (event) => {
    setImages(records.filter(r => r.tags.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return (
    <div>
      <span>
        <h1>Explore</h1>
        <input type="text" className="searchArea search" placeholder="Search..." onChange={getInputData} />
      </span>
      <div className={`post ${modeClass}`}>
        <div className="image-gallery">
          {images.map((image) => (
            <div key={image.id} className="images">
              <img src={image.webformatURL} alt={image.tags} />
              <p>{image.tags}</p>
              <p>Author: {image.author}</p>
              <button className="btn" onClick={() => toggleFollow(image.author)}>
                {followedAuthors.includes(image.author) ? 'Unfollow' : 'Follow'}
              </button>
              <button className="btn" onClick={() => toggleLike(image.id)}>
                {likedImages.includes(image.id) ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
              </button>
              <span>{likeCounts[image.id] || 0} likes</span>
              <input
                type="text"
                placeholder="Comment..."
                value={comments[image.id] || ''}
                onChange={(event) => setComments({ ...comments, [image.id]: event.target.value })}
                style={{ marginLeft: '10px', border: 'none', outline: 'none' }}
              />
              <button className="btn" onClick={() => toggleFavorite(image.id)}>
                {favoriteImages.includes(image.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About;
