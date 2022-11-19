import React, { useState } from "react";
import { Container } from "./styles";
import NewPostModal from "../../components/newPost/NewPostModal";
import Posts from "../../components/posts/Posts";
import NewPost from "../../components/newPost/newPost";


const Home = () => {

  const [newPostModal, setNewPost] = useState(false)

  function showModal(){
    newPostModal ? setNewPost(false) : setNewPost(true)
  }

  return (
    <Container>
      {newPostModal && <NewPostModal handleModal = {showModal} />}
      <NewPost handleModal= {showModal} />
      <Posts url={`/posts/feed/c24eecc2-e785-4f48-b5db-b583a5cb71cc`} />
    </Container>
  );
};

export default Home;
