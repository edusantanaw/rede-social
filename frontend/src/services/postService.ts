import { Api } from "../utils/api";

interface Post {
  content?: string;
  image: File | null;
  url: string;
}

// 0800722240;

const token = localStorage.getItem("@App:token");

export async function post(data: FormData) {
  const response = await Api.post("/posts", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
}

export async function remove(id: string) {
  const response = await Api.post(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
}

export async function addLike(id: string) {
  const response = await Api.post(`/posts/like/${id}`, id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  console.log(response);
  return response;
}

export async function newComment(data: { id: string; comment: string }) {
  const response = Api.post(`/posts/comments/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);

    return response
}
