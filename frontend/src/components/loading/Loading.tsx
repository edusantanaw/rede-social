import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <div className="loader"></div>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    padding: 1em;
    border: 2px solid #ffffff72;
    border-top: 3px solid #f98c07;
    border-radius: 50%;
    animation: is-rotating 0.6s linear infinite;
    @keyframes is-rotating {
      to {
        transform: rotateZ(1turn);
      }
    }
  }
`;
