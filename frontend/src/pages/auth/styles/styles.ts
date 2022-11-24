import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  color: #fff;
  background-color: #000;
  gap: 0.4em;
  .logo {
    width: 50%;
    height: 99vh;
    position: relative;
    .name {
      width: 100%;
      height: 100vh;
      position: absolute;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20%;
      background: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 100px 50px #000;
      h1 {
        font-size: 3em;
        color: #ee5622;
      }
      h2 {
        text-align: center;
        max-width: 14em;
        font-weight: 300;
        font-size: 2em;
      }
    }

    img {
      width: 100%;
      height: 99vh;
      object-fit: cover;
      opacity: 0.5;
    }
  }
  form {
    h1 {
      font-size: 3em;
      font-weight: 400;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    border-radius: 9px;
    color: #fff;
    width: 50%;
    height: 90vh;
    box-shadow: inset 0 0 200px 60px #000;
    div {
      label {
        display: block;
        margin-bottom: 0.5em;
      }

      input {
        width: 26em;
        height: 2.9em;
        padding-left: 1em;
        border: none;
        border-radius: 3px;
      }
    }

    input[type="submit"] {
      margin-top: 1em;
      height: 3em;
      background-color: #ee5622;
      color: #fff;
      border: 0;
      width: 26em;
      border-radius: 5px;
      margin-bottom: 1em;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        opacity: 0.9;
      }
    }

    span {
      color: #ee5622;
      text-decoration: none;
      cursor: pointer;
    }
    .error {
      color: red;
    }
    .input_error {
      border: 1px solid red;
    }

    #error {
      border: 1px solid red;
      padding: 0.5em 3em;
      color: red;
    }
  }

  @media (max-width: 900px){
    justify-content: center;
    
    .logo{
      display: none;
    }
  }
`;
