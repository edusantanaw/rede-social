import { Post } from "./Post";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Api } from "../../utils/api";

const token = localStorage.getItem("@App:token");
interface post {
  content?: string;
  id: string;
  image?: string;
  name: string;
  perfilPhoto?: string;
}

const Posts = ({ url, depence }: { url: string; depence?: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<post[]>([]);

  useEffect(() => {
    Api.get(`${url}?start=${currentPage}&limit=2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setData((current) => [...current, ...response.data]);
    });
  }, [currentPage, depence]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entry) => {
      const target = entry[0];
      if (target.isIntersecting) {
        setCurrentPage((page) => page + 2);
      }
    }, options);

    if (listRef.current) observer.observe(listRef.current);
  }, []);

  console.log(url);
  return (
    <List>
      {data &&
        data.map((post: post, i: number) => <Post post={post} key={i} />)}
      <div ref={listRef} />
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
    background-color: #000;
    gap: 1em;
    opacity: 0;
    animation: animate 0.7s 0.2s ease-in-out forwards;
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
  }
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
        transform: translate3d(0px, 10em, 0);
        opacity: 0;
      }

      100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
  }
`;
