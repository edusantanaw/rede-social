import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 6em;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 7em;
  .header {
    display: flex;
    align-items: center;
    gap: 5em;
    border-bottom: 1px solid #a0a0a0;
    padding-bottom: 4em;
    img {
      border-radius: 50%;
      width: 10em;
      height: 10em;
      object-fit: cover;
      border: 1px solid #ee5622;
    }
    .name {
      display: flex;
      gap: 4em;
      h2 {
        font-size: 1.6em;
      }

      button {
        padding: 0 2em;
        cursor: pointer;
        border: 1px solid #ee5622;
        background-color: #ee5622;
        color: #fff;
        border-radius: 5px;
        transition: 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
        &:hover {
          color: #ee5622;
          background-color: transparent;
        }
      }
    }

    svg {
      font-size: 2em;
    }
  }

  .follows {
    display: flex;
    align-items: center;
    gap: 2em;

    div {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.3em;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  @media (max-width: 970px ){
    padding-left: 10em;
    .header{
      gap: 3em;
    }
  }

  @media (max-width: 860px){
    gap: 1.5em;
    .header{
      img{
        width: 6em;
        height: 6em;
      }
    }
  }

  @media (max-width: 700px){
    padding-top: 2em;
    padding-left: 15%;
    .right{
      justify-content: center;
      align-items: center;
    }
    .header{
      flex-direction: column;
      width: 90%;
      img{
        width: 8em;
        height: 8em;
      }

      .name{
      flex-direction: column;
        align-items: center;
        justify-content: center;
      gap: 1em;
      button{
        height: 2.8em;
        width: 100%;
      }
    }
    }
    .follows{
      width: 90%;
      justify-content: space-between;

    }
  }

`;
