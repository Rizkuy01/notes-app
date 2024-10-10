import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { apiToken, getUser } from '../api/NoteService';

const RestrictAuth = () => {
  const token = apiToken();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const userData = await getUser();
          setUser(userData);
        } else {
          throw new Error('No token found');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Session Expired',
          text: 'You need to login again.',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then(() => {
          setShowAlert(true);
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (showAlert) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default RestrictAuth;
