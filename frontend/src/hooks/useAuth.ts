import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlices";

export default function useAuth() {
  const user = useSelector(selectUser);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      user.logged ? setIsAuth(true) : setIsAuth(false);
    }
  }, [user]);

  return { isAuth, isLoading };
}
