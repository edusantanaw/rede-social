import styled from "styled-components";

export const Container = styled.li `
    padding: 1em;
    border-radius: 10px;
    list-style: none;
    display: flex;
    flex-direction: column;
    background-color: #000;
    gap: 1em;
    width: 32em;
    opacity: 0;
    animation: animate 0.7s 0.1s ease-in-out forwards;
    .header_post {
      display: flex;
      align-items: center;
      gap: 1em;
      color: #ee5622;
      img {
        width: 2.2em;
        height: 2.2em;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid #ee5622;
      }
    }

    img {
      width: 30em;
      border-radius: 10px;
      max-height: 40em;
      object-fit: cover;
      cursor: pointer;
    }

    @media (max-width: 730px){
        width: 24em;
        img{
            width: 22em;
        }
    }
`

export const List = styled.ul`
  padding-top: 3em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding-bottom: 1em;

  .interactions {
    display: flex;
    gap: 2em;
    svg {
      font-size: 2em;
      padding: 0.1em;
      cursor: pointer;
      transition: 0.1s;
    }
    .marked {
      color: red;
    }

    @keyframes animate {
      0% {
        transform: translate3d(0px, 5em, 0);
        opacity: 0;
      }

      100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
  }
`;
