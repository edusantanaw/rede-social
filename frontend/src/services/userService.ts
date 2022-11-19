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

    console.log(response)

  if (response.userResponse && response.accessToken) {
    localStorage.setItem("App:user", JSON.stringify(response.userResponse));
    localStorage.setItem("@App:token", response.accessToken);
  }
  return response;
}


