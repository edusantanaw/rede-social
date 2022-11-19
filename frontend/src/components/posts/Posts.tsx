import { useApi } from "../../hooks/useApi";
import { Post } from "./Post";
import styled from 'styled-components'

interface post {
  content?: string;
  id: string;
  image?: string;
  name: string;
  perfilPhoto?: string;
}
const Posts = ({ url }: { url: string }) => {
  const { data } = useApi(url);
console.log(data)
  return (
    <List>
      {data &&
        data.map((post: post, i: number) => <Post post={post} key={i} />)}
    </List>
  );
};

export default Posts;


const List = styled.ul`
    padding-top: 3em;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding-bottom: 1em;
    li {
      padding: 1em;
      border-radius: 10px;
      list-style: none;
      display: flex;
      flex-direction: column;
      background-color: #1b1b2b;
      gap: 1em;
      .header_post {
        display: flex;
        align-items: center;
        gap: 1em;
        color: #ee5622;
        img {
          width: 2.2em;
          border-radius: 50%;
          border: 2px solid #ee5622;
        }
      }

      img {
        width: 30em;
        border-radius: 10px;
        max-height: 40em;
        object-fit: cover;
      }
    }
    .interactions{
      display: flex;
      gap: 2em;
      svg{
        font-size: 2em;
        padding: 0.1em;
      }
      .marked{
    color: red;
  }
    }
  
`