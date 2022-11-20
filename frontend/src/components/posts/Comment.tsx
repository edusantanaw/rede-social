import styled from "styled-components";
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
      <div className="header_comment">
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
  background-color: #1f1d1d5f !important;
  .header_comment {
    display: flex;
    align-items: center;
    gap: 1em;
    img {
      width: 2em;
      height: 2em;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;
