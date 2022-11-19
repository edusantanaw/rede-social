import React, { useEffect } from "react";
import { useApi } from "../../hooks/useApi";

const Follows = ({
  handleFollowers,
  type,
  id,
}: {
  handleFollowers: (total: number, type: string) => void;
  type: string;
  id: string;
}) => {
  const { data } = useApi(`/users/${type}/${id}`);
    
  handleFollowers(data.length, type);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Follows;
