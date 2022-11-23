import styled from "styled-components";

export const Container = styled.div`
  background-color: #161515;
  width: 22em;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 12.5em;
  padding: 3em 2em;
  z-index: 10;
  border-right: 1px solid #f4f4f45d;
  box-shadow: inset 0em 0em 4em 0.1em #f0f0f12f;
  input {
    width: 100%;
    height: 2.5em;
    border: none;
    border-radius: 5px;
    padding: 1em;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  ul {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      gap: 0.5em;
      position: relative;
      img {
        width: 2em;
        height: 2em;
        border-radius: 50%;
      }
    }
  }
  @media (max-width: 820px) {
    left: 8em;
  }
  @media (max-width: 680px) {
    left: 5em;
  }
`;
