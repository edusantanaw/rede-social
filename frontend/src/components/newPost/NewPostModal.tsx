import { useAppDispatch } from "../../store/store";
import { newPost as create } from "../../slices/postSlices";
import React, { useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Modal } from "./styles";


const NewPost = ({ handleModal }: { handleModal: () => void }) => {
  const user = JSON.parse(localStorage.getItem("App:user") || "{}");
  const dispatch = useAppDispatch();
  const content = useRef<HTMLTextAreaElement | null>(null);
  const [image, setImage] = useState<File | string>("");
  const navigate = useNavigate()
  console.log(user.id)
  const handleImage = (e: React.FormEvent<HTMLInputElement>) => {
    const img = (e.target as HTMLInputElement).files;
    console.log(img)
    if (img) setImage(img[0]);
  };

  async function createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData  = new FormData() 
    if (content || image) {
      formData.append("content", content.current ? content.current.value : "")
      formData.append('image', image)
      formData.append('url', "/posts")

      await dispatch(create(formData));
      navigate(`/perfil/${user.id}`)
      handleModal();
    }
  }

  return (
    <Modal>
      <div onClick={handleModal} className="close"></div>
      <form onSubmit={(e) => createPost(e)}>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="text" ref={content}></textarea>
        <div className="buttons">
          <label htmlFor="image" id="img">
            Image
          </label>
          <input type="file" id="image" onChange={(e) => handleImage(e)} />
          <input type="submit" />
        </div>
      </form>
    </Modal>
  );
};

export default NewPost;
