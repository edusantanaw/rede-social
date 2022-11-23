import styled from "styled-components";

export const Container = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  display: ${(props) => (props.show ? "flex" : "none")};
  .close {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: #00000063;
  }
  ul {
    width: 20em;
    background-color: #222121;
    border-radius: 6px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      text-transform: uppercase;
      padding: 0.5em;
    }
    span {
      text-align: center;
      padding: 0.5em;
    }
    a{
      display: flex;
      align-items: center;
      padding: 0.5em;
      margin: 0;
      text-decoration: none;
      color: #fff;
    }
    li {
      width: 100%;
      list-style: none;
      gap: 1em;
      cursor: pointer;
      img {
        width: 2.5em;
        height: 2.5em;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
`;