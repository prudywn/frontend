import Post from "../post/Post";
import "./Posts.css";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Posts() {
  const { isDarkMode } = useDarkMode();
  const modeClass = isDarkMode ? 'dark' : '';

  return (
    <div className={`posts ${modeClass}`}>
      <Post />
     {/*  <Post />
      <Post />
      <Post />
      <Post />
      <Post /> */}
    </div>
  );
}
