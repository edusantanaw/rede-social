import styled from "styled-components";

export const HeaderContainer = styled.header`
  padding: 1em 5em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
