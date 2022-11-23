import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { Api } from "../../utils/api";
import Perfil from "./components/Perfil";

const token = localStorage.getItem("@App:token");
export const Main = () => {
  const { id } = useParams<{ id: string }>();
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [currentPerfil, setCurrentPerfil] = useState<string | null>(null);

  useEffect(() => {
    if (id) if (id !== currentPerfil) setCurrentPerfil(id);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    Api.get(`/users/perfil/${id}`, {
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
  }, [currentPerfil]);

  if (loading) return <Loading />;
  return <Perfil data={response} current={loading} />;
};
