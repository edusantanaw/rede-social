import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 5px;
  right: 1em;
  background-color: #2a2a2a;
  border-radius: 5px;
  height: 25em;
  width: 20em;
  display: flex;
  z-index: 10;
  box-shadow: 1px 1px 5px 1px #beb5b5;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
    gap: 1em;
    border-bottom: 1px solid #a0a0a0;
    background-color: #0b0b0b;
    img {
      width: 2em;
      height: 2em;
      border-radius: 50%;
    }
  }
  ul {
    padding: 0.5em;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 0.5em;
    height: 17em;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.5em;
      background-color: #272525;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #fff;
      border-radius: 4px;
    }

    li {
      color: #fff;
      font-size: 2em;
      list-style: none;
      width: 100%;
      span {
        padding: 0.1em 0.5em;
        border-radius: 5px;
        font-size: 0.6em;
        font-weight: 300;
      }
    }
    .user {
      display: flex;
      justify-content: flex-end;
      span {
        background-color: #3b383d;
      }
    }
    .follower {
      span {
        background-color: #21063f;
      }
    }
  }
  .send {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    gap: 0.4em;
    input {
      width: 80%;
      height: 2.5em;
      border: none;
      border-radius: 5px;
      padding: 1em;
    }
    button {
      width: 4em;
      border-radius: 5px;
      background-color: #070707;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg {
        color: #fff;
        font-size: 2.2em;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }
  /* @media (max-width: 820px) {
    left: 8em;
  } */
  @media (max-width: 680px) {
    left: 5em;
    top: 2px;
    width: 83%;
    height: 100vh;

    ul{
        padding: 1em;
        height: 30em;
    }

    .send{
        padding: 1em 1em 1em 1em;
        input{
            height: 3.4em;
        }
        button{
            height: 3.4em;
        }
    }
  }
`;
