import { Link } from "react-router-dom";
import { Container } from "./styles/follows";

interface user {
  id: string;
  perfilPhoto: string;
  name: string;
}

const Follows = ({
  type,
  handleModal,
  show,
  data,
}: {
  data: user[];
  type: string;
  handleModal: () => void;
  show: boolean;
}) => {
  return (
    <Container show={show}>
      <div className="close" onClick={() => handleModal()}></div>
      <ul>
        <h2>{type}</h2>
        {data.length > 0 ? (
          data.map((users: user, i: number) => (
            <li key={i}>
              <Link to={`/perfil/${users.id}`}>
              <img
                src={`http://localhost:5001/users/${users.perfilPhoto}`}
                alt="user photo"
              />
              <span>{users.name}</span>
              </Link>
            </li>
          ))
        ) : (
          <span>Followers not found!</span>
        )}
      </ul>
    </Container>
  );
};

export default Follows;


