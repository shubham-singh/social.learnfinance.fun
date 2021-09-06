import { Route, Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface Props {
  path?: string | undefined,
  [key: string]: any
}

const PrivateRoute = ({ path, ...props }: Props) => {
  
  const { id } = useParams();
  const { loggedIn } = useAppSelector((state) => state.auth);
  console.log("prive route loaded again", loggedIn);
  return loggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path?.replace(':id', id) }} replace to="/login" />
  );
};

export default PrivateRoute;