import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { Api } from "../../utils/api";
import Perfil from "./Perfil";

const token = localStorage.getItem("@App:token");
export const Main = () => {
  const userId = useParams<{ id: string }>();
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      Api.get(`/users/perfil/${userId.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setResponse(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [userId]);

  if (loading) return <Loading />;
  return <Perfil data={response} />;
};
