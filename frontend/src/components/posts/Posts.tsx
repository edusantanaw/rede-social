import { useApi } from "../../hooks/useApi";
import { Post } from "./Post";

interface post {
  content?: string;
  id: string;
  image?: string;
  name: string;
  perfilPhoto?: string;
}
const Posts = ({ url }: { url: string }) => {
  const { data } = useApi(`/posts/${url}/c24eecc2-e785-4f48-b5db-b583a5cb71cc`);

  return (
    <ul>
      {data &&
        data.map((post: post, i: number) => <Post post={post} key={i} />)}
    </ul>
  );
};

export default Posts;
