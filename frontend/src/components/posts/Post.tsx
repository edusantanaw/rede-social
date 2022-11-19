import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { useApi } from "../../hooks/useApi";
import { postlike } from "../../slices/postSlices";
import { useAppDispatch } from "../../store/store";
import PostModal from "./PostModal";

interface post {
  content?: string;
  id: string;
  image?: string;
  name: string;
  perfilPhoto?: string;
}

const user = JSON.parse(localStorage.getItem("App:user") || "{}");

interface like {
  id: string;
  userId: string;
  postId: string;
}

export const Post = ({ post, key }: { post: post; key: number }) => {
  const dispatch = useAppDispatch();
  const [like, setLike] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState("s");

  const { data } = useApi(`/posts/like/${post.id}`);

  useEffect(() => {
    const verifyLike = data.filter((userLike: like) => {
      return userLike.userId === user.id;
    });

    if (verifyLike.length > 0) {
      setLike(true);
      setLiked(true);
    }
  }, [data]);

  async function handleLike() {
    liked ? setLiked(false) : setLiked(true);
    console.log(liked);
    await dispatch(postlike(post.id));
  }

  function handleModal() {
    showModal ? setShowModal(false) : setShowModal(true);
  }

  return (
    <li key={key} onClick={() => setModalId(post.id)}>
      {showModal && <PostModal id={modalId} handleModal={handleModal} />}
      <div className="header_post">
        <img
          src={`http://localhost:5001/users/${post.perfilPhoto}`}
          alt="user photo"
        />
        <h3>{post.name}</h3>
      </div>
      <p>{post?.content}</p>
      {post.image && (
        <img
          src={`http://localhost:5001/posts/${post.image}`}
          alt="post image"
          onClick={handleModal}
        />
      )}
      <div className="interactions">
        <AiFillHeart
          onClick={() => handleLike()}
          className={liked ? "marked" : ""}
        />
        <FiMessageSquare onClick={() => handleModal()} />
      </div>
    </li>
  );
};
