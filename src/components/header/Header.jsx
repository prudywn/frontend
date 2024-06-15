import "./Header.css"
import { useDarkMode } from "../contexts/DarkModeContext";
//import React, {useState, useEffect} from 'react'


export default function Header() {
  const { isDarkMode } = useDarkMode();
  const modeClass = isDarkMode ? 'dark' : '';
  


  return (
    <div className={`header ${modeClass}`}>
       <div className="headerTitle">
        <span className="headerTitleSm">React</span>
        <span className="headerTitleLg">Blog</span>
       </div>
       <img className="headerImg"  src="https://images.pexels.com/photos/9716828/pexels-photo-9716828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />

       
      
        </div>
        
  )
}

// const [query, setQuery] = useState([])
//   const [posts, setPosts] = useState([])
//   const [filteredPosts, setFilteredPosts] = useState([])

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try{
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         const data = await response.json()
//         setPosts(data)
//         setFilteredPosts(data)
//       } catch(error){
//         console.error(error)
//       }
//     }
//     fetchPosts()
//   }, [])

//   useEffect(() => {
//     const results = posts.forEach(post => post.title.toLowerCase().include(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase()) || post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
//     setFilteredPosts(results)
//   }, [query, posts])