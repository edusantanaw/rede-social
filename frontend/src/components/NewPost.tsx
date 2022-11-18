import React from "react";
import styled from "styled-components";

const NewPost = ({ handleModal }: { handleModal: () => void }) => {
  return (
    <Modal>
      <div onClick={handleModal} className="close"></div>
      <form>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="text"></textarea>
        <div className="buttons">
          <label htmlFor="image" id="img">
            Image
          </label>
          <input type="file" id="image" />
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
    background-color: #1b1b2b;
    border-radius: 10px;
    textarea {
      width: 100%;
      height: 10em;
      border: 1px solid #fff;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      margin-bottom: 2em;
      color:#fff;
        padding: 1em;
      &:focus{
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
