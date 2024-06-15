// Sidebar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useDarkMode } from "../contexts/DarkModeContext";
import { PostsContext } from "../contexts/PostContext"; 

export default function Sidebar() {
  const { isDarkMode } = useDarkMode();
  const { posts } = useContext(PostsContext); // Access posts data from context

  const categories = ["Life", "Music", "Style", "Sports", "Tech", "Cinema"];

  const checkCategoryPosts = (category) => {
    return posts.some((post) => post.category === category);
  };

  const modeClass = isDarkMode ? "dark" : "";

  return (
    <div className={`sidebar ${modeClass}`}>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          className="sidebarImg"
          src="https://images.pexels.com/photos/6850746/pexels-photo-6850746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ullam cupiditate beatae...</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category) => (
            <li key={category} className="sidebarListItem">
              {checkCategoryPosts(category) ? (
                <Link to={`/posts/${category.toLowerCase()}`}>{category}</Link>
              ) : (
                <span onClick={() => alert(`No posts found for ${category}`)}>{category}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-tiktok"></i>
        </div>
      </div>
    </div>
  );
}
