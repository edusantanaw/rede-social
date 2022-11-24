import { Api } from "../utils/api";

// type equals signin or users
interface User {
  name?: string;
  password: string;
  email: string;
  confirmPassword?: string;
  type: string;
}

export function getUserAndToken(type?: string){
  const user = JSON.parse(localStorage.getItem("App:user") || "{}");
  const token = localStorage.getItem('@App:token')
  if(type === "user") return user
  return token
}

export async function auth(data: User) {
  const response = await Api.post(data.type, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  if (response.userResponse && response.accessToken) {
    localStorage.setItem("App:user", JSON.stringify(response.userResponse));
    localStorage.setItem("@App:token", response.accessToken);
  }
  return response;
}

export async function logout() {
  localStorage.removeItem("App:user");
  localStorage.removeItem("@App:token");

  return;
}

export async function update(data: FormData) {
 const user = getUserAndToken("user")
 const token = getUserAndToken()
  const response = await Api.patch(`/users/update/${user.id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  if (response.userUpdated)
    localStorage.setItem("App:user", JSON.stringify(response.userUpdated));

  return response;
}

export async function addFollow(id: string) {
  const token = getUserAndToken()
  const response = await Api.post(`/users/add/${id}`, id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  console.log(response);
  return response;
}
