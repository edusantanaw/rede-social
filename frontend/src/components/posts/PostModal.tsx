import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useApi } from "../../hooks/useApi";
import { addNewComment } from "../../slices/postSlices";
import { useAppDispatch } from "../../store/store";
import { Api } from "../../utils/api";

interface post {
  user: string;
  image: string;
  content: string;
  name: string;
  id: string;
  perfilPhoto: string;
}

const token = localStorage.getItem("@App:token");

const PostModal = ({
  id,
  handleModal,
}: {
  id: string;
  handleModal: () => void;
}) => {
  const { data, loading } = useApi(`/posts/${id}`);
  const [comments, setComments] = useState<string[]>([]);
  const comment = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  async function handleComment() {
    if (comment.current) {
      const data = {
        comment: comment.current.value,
        id: id,
      };

      await dispatch(addNewComment(data));
    }
  }

  useEffect(() => {
    Api.get(`/posts/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setComments(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Modal>
      <div onClick={handleModal} className="close"></div>
      <div className="post">
        {data &&
          data.map((post: post) => (
            <>
              {post.image && (
                <img
                  src={`http://localhost:5001/posts/${post.image}`}
                  alt="post image"
                />
              )}

              <div className="right">
                <div className="header">
                  <img
                    src={`http://localhost:5001/users/${post.perfilPhoto}`}
                    alt="user photo"
                  />
                  <span>{post.name}</span>
                </div>
                <p>{post.content}</p>
                <div>
                  {comments &&
                    comments.map((comment, i: number) => <div key={i}></div>)}
                </div>
                <div className="new_comment">
                  <input type="text" placeholder="example..." ref={comment} />
                  <button onClick={() => handleComment()}>Send</button>
                </div>
              </div>
            </>
          ))}
      </div>
    </Modal>
  );
};

export default PostModal;

const Modal = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .close {
    background-color: #00000063;
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100vh;
  }
  .post {
    z-index: 5;
    display: flex;
    background-color: #1f2937;
    border-radius: 10px;
    padding: 1em;
    max-height: 35em;
    gap: 2em;
    img {
      object-fit: cover;
    }
    .right {
      padding: 1em;
      display: flex;
      flex-direction: column;
      gap: 1em;
      position: relative;
      .header {
        gap: 0.7em;
        display: flex;
        align-items: center;
        width: 25em;
        img {
          width: 2em;
          border-radius: 50%;
        }
      }
      .new_comment {
        position: absolute;
        bottom: 10px;
        width: 100%;
        display: flex;
        gap: 1em;
        input {
          width: 80%;
          height: 2.8em;
          border: none;
          border-radius: 5px;
          padding: 0.5em;
        }

        button {
          width: 15%;
          cursor: pointer;
          border-radius: 5px;
          border: none;
          background-color: #00000063;
        }
      }
    }
  }
`;
