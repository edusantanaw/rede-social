import React from "react";
import { string } from "yup";
import styled from 'styled-components'
interface comment {
  name: string;
  perfilPhoto: string;
  content: string;
  user: string;
  id: string;
}

const Comment = (comment: { comment: comment }) => {
  return (
    <Container>
      <div className="header">
        <img
          src={`http://localhost:5001/users/${comment.comment.perfilPhoto}`}
          alt="user photo"
        />
        <h3>{comment.comment.name}</h3>
      </div>
      <p>{comment.comment.content}</p>
    </Container>
  );
};

export default Comment;


const Container = styled.li`
    
    .header{
        h3{
            font-weight: 400;
        }
    }

`