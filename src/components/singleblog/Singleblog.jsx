import "./Singleblog.css"
import { useNavigate } from 'react-router-dom'

export default function SingleBlog() {
  const navigate = useNavigate()

  // Function to handle exit button click
  const handleExitClick = () => {
    // Navigate back to main Blogs page
    navigate.goBack();
  };

  return (
    <div className="SinglePost">
      <div className="singlePostWrapper">
        <img
          src="https://images.pexels.com/photos/62389/pexels-photo-62389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="singlePostImg"
        />
        <h1 className="singlePostTitle">Lorem ipsum, dolor sit amet
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
            <i className="singlePostIcon fa-solid fa-trash-can"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">Author : <b>Musa</b></span>
          <span className="singlePostDate">1 hourAgo</span>
        </div>
        <p className="singlePostDesc">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde iste perspiciatis consectetur blanditiis eveniet, quisquam, ipsam nemo quidem aliquam vitae, facilis rerum sed. Accusantium eius itaque officiis nihil error quia.
          {/* Rest of your content */}
        </p>
      </div>
      <button className="exitButton" onClick={handleExitClick}>
        <i className="fas fa-times"></i> {/* Exit icon */}
      </button>
    </div>
  )
}
