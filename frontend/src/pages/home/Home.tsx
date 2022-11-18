import React, { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Container } from "./styles";
import { BsFillImageFill } from "react-icons/bs";
import NewPost from "../../components/NewPost";

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
interface post {
  content?: string;
  image?: string;
  name: string;
  perfilPhoto?: string;
}

const Home = () => {
  const { data } = useApi(`/posts/feed/c24eecc2-e785-4f48-b5db-b583a5cb71cc`);
  const [newPostModal, setNewPost] = useState(false)

  function showModal(){
    newPostModal ? setNewPost(false) : setNewPost(true)
  }

  return (
    <Container>
      {newPostModal && <NewPost handleModal = {showModal} />}
      <div className="new_post" onClick={showModal}>
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
      <ul>
        {data &&
          data.map((post: post, i: number) => (
            <li key={i}>
              <div className="header_post">
                <img
                  src={`http://localhost:5001/users/${post.perfilPhoto}`}
                  alt=""
                />
                <h3>{post.name}</h3>
              </div>
              <p>{post?.content}</p>
              {post.image && (
                <img
                  src={`http://localhost:5001/posts/${post.image}`}
                  alt="post image"
                />
              )}
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default Home;
