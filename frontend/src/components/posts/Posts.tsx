import { Post } from "./Post";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Api } from "../../utils/api";
import { List } from "./styles";


interface post {
  content?: string;
  id: string;
  image?: string;
  name: string;
  perfilPhoto?: string;
}

const Posts = ({ url, depence }: { url: string; depence?: any }) => {
  const token = localStorage.getItem("@App:token");
  const [currentPage, setCurrentPage] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<post[]>([]);

  useEffect(() => {
    Api.get(`${url}?start=${currentPage}&limit=3`, {
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
        setCurrentPage((page) => page + 3);
      }
    }, options);

    if (listRef.current) observer.observe(listRef.current);
  }, []);
  return (
    <List>
      {data &&
        data.map((post: post, i: number) => <Post post={post} key={i} />)}
      <div ref={listRef} />
    </List>
  );
};

export default Posts;

