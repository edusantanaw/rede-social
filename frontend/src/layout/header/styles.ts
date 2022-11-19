import styled from "styled-components";

export const HeaderContainer = styled.header`
  padding: 1em 5em;
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1;
  background-color: #000;
  border-bottom: 1px solid #adbaca;

  .search{
    width: 25em;
    position: relative;
    height: 2.3em;

    input{
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 6px;
      background-color: #fff;

      &:focus {
        outline-color: #ee5622;
      }
    }

    svg{
      right: 10px;
      top: 6px;
      font-size: 1.6em;
      color: #ee5622;
      position: absolute;
    }
  }
  ul {
    display: flex;
    align-items: center;
    gap: 1.5em;
    li {
      list-style: none;
      cursor: pointer;
      svg {
        color: #fff;
        font-size: 1.6em;
      }
      img {
        width: 2em;
        border-radius: 50%;
      }
    }
  }
`;
