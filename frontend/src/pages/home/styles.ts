import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 8em;
  padding-left: 7em;
  @media (max-width: 730px){
        padding-left: 5em;
        padding-top: 4em;
    }
`;
