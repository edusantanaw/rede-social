import { useState } from "react";
import { Container } from "./styles";
import NewPostModal from "../../components/newPost/NewPostModal";
import Posts from "../../components/posts/Posts";
import NewPost from "../../components/newPost/newPost";

const Home = () => {
  const user = JSON.parse(localStorage.getItem('App:user')|| "{}" )

  const [newPostModal, setNewPost] = useState(false)

  function showModal(){
    newPostModal ? setNewPost(false) : setNewPost(true)
  }

  return (
    <Container>
      {newPostModal && <NewPostModal handleModal = {showModal} />}
      <NewPost handleModal= {showModal} />
      <Posts url={`/posts/feed/${user.id}`} />
    </Container>
  );
};

export default Home;
