import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';  

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:5000/api/protected', { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;  
  }

  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/newhome" replace />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
