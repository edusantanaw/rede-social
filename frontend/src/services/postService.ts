import { Api } from "../utils/api";
import { getUserAndToken } from "./userService";

interface Post {
  content?: string;
  image: File | null;
  url: string;
}

// 0800722240;


export async function post(data: FormData) {
  const token = getUserAndToken()
  console.log(token)

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
  const token = getUserAndToken()
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
  const token = getUserAndToken()
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
  const token = getUserAndToken()
  const response = Api.post(`/posts/comments/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);

    return response
}
