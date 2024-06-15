import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Topbar from './components/topbar/Topbar';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import About from './pages/about/Explore';
import Posts from './components/posts/Posts';
import SinglePost from './components/singlePost/SinglePost';
import Logout from './pages/Logout';  // Import the new Logout component
import { PostsProvider } from './components/contexts/PostContext';
import { NotificationProvider } from './components/contexts/Notification';
import NotificationPage from './pages/NotificationsPage';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <NotificationProvider>
      
      <PostsProvider>
        <Router>
          <Topbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/write" element={user ? <Write /> : <Navigate to="/register" />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/register" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
            <Route path="/about" element={user ? <About /> : <Navigate to="/register" />} />
            <Route path="/logout" element={user ? <Logout setUser={setUser} /> : <Navigate to="/login" />} />
            <Route path="/read/:id" element={<Single />} />
            <Route path="/posts/:category" element={<Posts />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/notifications" element={<NotificationPage />} />
          </Routes>
        </Router>
      </PostsProvider>
    </NotificationProvider>
  );
}
