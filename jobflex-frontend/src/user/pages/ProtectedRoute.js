import { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  console.log(auth.isLoggedIn)
  if (!auth.isLoggedIn) {
    console.log(auth.isLoggedIn)
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;
