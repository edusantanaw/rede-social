import { Api } from "../utils/api";

// type equals signin or users
interface User {
  name?: string;
  password: string;
  email: string;
  confirmPassword?: string;
  type: string
}

export async function auth(data: User) {
  const response = await Api.post(data.type, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  if (response.user && response.token) {
    localStorage.setItem("App:user", JSON.stringify(response.user));
    localStorage.setItem("@App:token", response.token);
  }
  return response;
}


