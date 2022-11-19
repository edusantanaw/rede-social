import styled from "styled-components";

export const HeaderContainer = styled.header`
  padding: 3em 5em;
  width: 15%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  z-index: 1;
  background-color: #000;
  gap: 2em;
  a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
    
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    li {
      width: 100%;
      gap: 1em;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: start;
      cursor: pointer;
      svg {
        color: #fff;
        font-size: 2em;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 0.15em;
        border-radius: 5px;
      }
      img {
        width: 2em;
        border-radius: 50%;
      }
    }
  }
`;
