import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    height: 100vh;
    padding-top: 6em;
    display: flex;
    align-items: center;
    flex-direction: column;

    .header{
        display: flex;
        align-items: center;
        gap: 5em;
        img{
            border-radius: 50%;
            width: 10em;
        }
        .name{
            display: flex;
            gap: 1em;
        h2{
            font-size: 1.6em;
        }
    }
    }

    .follows{
        display: flex;
        align-items: center;
        justify-content: space-between;

        div{
            display: flex;
            align-items: center;
            gap: 0.3em;
        }
    }

    .right{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
`