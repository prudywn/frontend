import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts"
import "./Home.css";
import { useDarkMode } from "../../components/contexts/DarkModeContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { isDarkMode } = useDarkMode();
  const modeClass = isDarkMode ? 'dark' : '';

  return (
   <div className={`homeBgcolor ${modeClass}`}>
      <Header />
      <div className={`home ${modeClass}`}>
         <Posts /> 
        <Sidebar />
      </div>
      <Link to={'https://blogapp-xlkxfcmmjxmleojg5eaunt.streamlit.app/'}>
      <div className="chatbot">
      <p className="chatbottext">Wanna Chat</p>
      <i className="chatbotIcon fa-brands fa-rocketchat"></i>
      </div>
      </Link>
      </div>
  );
}
