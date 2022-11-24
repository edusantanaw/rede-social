import { BsFillImageFill } from "react-icons/bs";
import { NewPostContainer } from "./styles";

const NewPost = ({ handleModal }: { handleModal: () => void }) => {
const user = JSON.parse(localStorage.getItem("App:user") || "{}");
  return (
    <NewPostContainer onClick={handleModal}>
      <div className="top">
        <img
          src={`http://localhost:5001/users/${user.perfilPhoto}`}
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
    </NewPostContainer>
  );
};

export default NewPost;
