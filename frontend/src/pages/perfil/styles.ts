import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    height: 100vh;
    padding-top: 6em;
    display: flex;
    align-items: center;
    flex-direction: column;

    .header{
        display: flex;
        align-items: center;
        gap: 5em;
        border-bottom: 1px solid #a0a0a0;
        padding-bottom: 4em;
        img{
            border-radius: 50%;
            width: 10em;
            height: 10em;
            object-fit: cover;
            border: 1px solid #ee5622;
        }
        .name{
            display: flex;
            gap: 4em;
        h2{
            font-size: 1.6em;
        }

        button {
            padding: 0 2em;
            cursor: pointer;
            border: 1px solid #ee5622;
            background-color: #ee5622;
            color: #fff;
            border-radius: 5px;
            transition: 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
            &:hover{
                color: #ee5622;
                background-color: transparent;
            }
        }
    }

    svg{
        font-size: 2em;
    }
    }

    .follows{
        display: flex;
        align-items: center;
        gap: 2em;
        
        div{
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.3em;
        }
    }

    .right{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
`


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
`;