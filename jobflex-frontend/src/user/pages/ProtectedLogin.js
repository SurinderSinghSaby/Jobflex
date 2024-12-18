import { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { Navigate } from 'react-router-dom';

const ProtectedLogin= ({ children }) => {
  const auth = useContext(AuthContext);

  if (auth.isLoggedIn) {
    return <Navigate to='/dashboard/:userId' />;
  }
  return children;
};

export default ProtectedLogin;
