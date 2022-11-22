import styled from "styled-components";
import { useAppDispatch } from "../../store/store";
import { newPost as create } from "../../slices/postSlices";
import React, { useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'


const user = JSON.parse(localStorage.getItem("App:user") || "{}");
const NewPost = ({ handleModal }: { handleModal: () => void }) => {
  const dispatch = useAppDispatch();
  const content = useRef<HTMLTextAreaElement | null>(null);
  const [image, setImage] = useState<File | string>("");
  const navigate = useNavigate()

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

const Modal = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  z-index: 2;
  .close {
    width: 100%;
    height: 100vh;
    position: absolute;
  }

  form {
    margin-top: 5em;
    z-index: 3;
    background-color: #fff;
    width: 32em;
    height: 18em;
    padding: 1em;
    background-color: #000;
    border: 1px solid #a0a0a0;
    border-radius: 10px;
    textarea {
      width: 100%;
      height: 10em;
      border: 1px solid #fff;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      margin-bottom: 2em;
      color: #fff;
      padding: 1em;
      &:focus {
        outline: none;
      }
    }
    input[type="file"] {
      display: none;
    }
    #img {
      padding: 0.6em 2em;
      border-radius: 3px;
      color: #ee5622;
      border: 1px solid #ee5622;
      cursor: pointer;
    }

    input {
      width: 10em;
      height: 2.3em;
      border: none;
      border-radius: 5px;
      background-color: #ee5622;
      color: #fff;
      font-size: 1.2em;
      cursor: pointer;
      transition: 0.4s;
      &:hover {
        background: transparent;
        border: 1px solid #ee5622;
      }
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
