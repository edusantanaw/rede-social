import styled from "styled-components";

export const Container = styled.div`
  background-color: #161515;
  width: 13em;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 15%;
  padding: 3em 2em;
  display: flex;
  flex-direction: column;
  gap: 3em;
  z-index: 10;
  box-shadow: inset 0em 0em 4em 0.1em #f0f0f12f;
  border-right: 1px solid #f4f4f45d;
  a {
    text-decoration: none;
    color: #fff;
  }

  ul{
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
      cursor: pointer;
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
