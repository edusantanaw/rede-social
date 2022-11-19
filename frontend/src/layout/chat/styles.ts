import styled from "styled-components";

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 1em;
  height: auto;
  z-index: 1;
  background-color: #000;
  border: 1px solid #adbaca;
  border-radius: 5px 5px 0 0px;
  border-bottom: none;
  .bottom {
    width: 19em;
    padding: 0.4em;
    text-align: center;
    background-color: #000;
    cursor: pointer;
    border-radius: 5px 5px 0 0px;
  }
  #show {
    height: auto;
  }

  #none {
    height: 0px;
}

  ul {
    border-top: 1px solid #adbaca;
    background-color: #000;
    display: flex;
    transition: 0.5s cubic-bezier(0.215, 0.610, 0.355, 1);
    flex-direction: column;
    gap: 0.1em;
    li {
      padding: 0.5em;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 1em;
      img {
        width: 2em;
        border-radius: 50%;
      }
    }
    li + li {
      border-top: 1px solid #adbaca;
    }
  }
`;
