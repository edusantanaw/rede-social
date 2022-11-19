import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlices";

export default function useAuth() {
  const user = useSelector(selectUser);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user)
    if (user) {
      user.userReducer.logged ? setIsAuth(true) : setIsAuth(false);
    }
  }, [user]);

  console.log(user)

  return { isAuth, isLoading };
}
