import { Api } from "../utils/api";
import { useState, useEffect } from "react";


const token = localStorage.getItem("@App:token");

export  function useApi(url: string) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  useEffect(() => {
    Api.get(url ? url : '/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
