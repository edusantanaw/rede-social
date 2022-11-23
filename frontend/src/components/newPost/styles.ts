import styled from "styled-components";

export const Modal = styled.div`
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
  @media (max-width: 600px){
    width: 28em;
  }
}
`;


export const NewPostContainer = styled.div`
    width: 32em;
    border-radius: 10px;
    background-color: #000;
    padding: 1em;
    cursor: pointer;
    .top {
      display: flex;
      align-items: center;
      gap: 1em;
      img {
        width: 2.2em;
        height: 2.2em;
        border-radius: 50%;
        border: 2px solid #ee5622;
      }
      input {
        width: 90%;
        height: 2.5em;
        border: none;
        border-radius: 4px;
        padding-left: 2em;
        font-size: 0.9em;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
    }
    .bottom {
      color: #ee5622;
      display: flex;
      padding-top: 0.5em;
      align-items: center;
      gap: 0.6em;
      svg {
        font-size: 1.5em;
      }
      span {
        text-align: center;
      }
    }

    @media (max-width: 730px){
        width: 24em ;
        img{
            width: 24em;
        }
    }
 
`