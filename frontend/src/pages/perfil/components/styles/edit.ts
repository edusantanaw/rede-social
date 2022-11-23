import styled from "styled-components";

export const EditContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: flex-start;
  z-index: 5;
  form {
    display: flex;
    flex-direction: column;
    gap: 1.6em;

    .input {
      display: flex;
      flex-direction: column;

      input {
        height: 3em;
        border: none;
        padding: 1em;
        border-radius: 5px;
      }

      textarea {
        height: 5em;
        border-radius: 5px;
        border: none;
        padding: 1em;
      }
      .error {
        color: #c90303;
      }
      .error_input {
        border: 1px solid #c90303;
      }
    }

    input[type="submit"] {
      height: 2.8em;
      width: 15em;
      align-self: center;
      background-color: #ee5622;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 1.05em;
      cursor: pointer;
    }
  }
  .close {
    background-color: #00000041;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .content {
    padding: 1.5em;
    width: 40%;
    background-color: #000;
    z-index: 5;
    border: 1px solid #a0a0a0;
    border-radius: 6px;
  }

  .picture {
    display: flex;
    align-items: center;
    gap: 2em;

    img {
      width: 5em;
      height: 5em;
      border-radius: 50%;
      object-fit: cover;
    }
    label {
      padding: 0.5em 1em;
      border: 1px solid #ee5622;
      color: #ee5622;
      border-radius: 5px;
      cursor: pointer;
    }
    input {
      display: none;
    }
}
.content {
  @media (max-width: 800px) {
    width: 60% ;
    form {
      width: 100%;
    }
  }

  @media (max-width: 600px){
    width: 70%;
  }
}
`;
