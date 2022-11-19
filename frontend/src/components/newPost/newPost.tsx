import React from 'react'
const user = JSON.parse(localStorage.getItem("App:user") || "{}");
import { BsFillImageFill } from "react-icons/bs";

const NewPost = ({handleModal}: {handleModal: ()=> void }) => {
  return (
    <div className="new_post" onClick={handleModal}>
    <div className="top">
      <img
        src={`http://localhost:5001/users/${user.photo}`}
        alt="user photo"
      />
      <input
        type="text"
        id="post"
        placeholder="Create a new post..."
        readOnly
      />
    </div>
    <div className="bottom">
      <BsFillImageFill />
      <span>Image</span>
    </div>
  </div>
  )
}

export default NewPost