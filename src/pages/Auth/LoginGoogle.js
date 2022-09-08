import React, { useEffect, useMemo} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

export function useSearchParams() {
  const { search } = useLocation();

  return useMemo(
    () => new URLSearchParams(search),
    [search]
  );
}

const LoginGoogle = () => {
  const query = useSearchParams()
  const bearerToken = query.get('user');
  useEffect(() => {
    if (bearerToken) {
      localStorage.setItem("user", bearerToken);
      window.location.href = `http://localhost:3000/project`;
    }
  }, [bearerToken]);

  return <div>loading...</div>;
};
export default LoginGoogle;
