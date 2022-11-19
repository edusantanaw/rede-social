import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 7em;
  .new_post {
    width: 32em;
    border-radius: 10px;
    background-color: #1b1b2b;
    padding: 1em;
    cursor: pointer;
    .top {
      display: flex;
      align-items: center;
      gap: 1em;
      img {
        width: 2.2em;
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
  }

 
 
`;
