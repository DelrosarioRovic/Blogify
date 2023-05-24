import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiCall from "../API/Api-call";
import { AuthState } from "../redux/reducer/authReducer"; 

// interface hook
import { AuthUserInfo } from '../interface/hook/AuthUserInfo';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const authenticated = useSelector((state: { authReducer: AuthState }) => state.authReducer.authenticated);
  const [data, setData] = useState<AuthUserInfo | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await ApiCall("GET", "http://localhost:4000/route/user");
        if (res.status === 200) {
          dispatch({ type: 'SET_AUTHENTICATED', payload: true });
          setData(res.data.user);
        } 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch, authenticated]);

  const signIn = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
  };

  const signOut = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
  };

  return { authenticated, signIn, signOut, data, loading };
};

export default useAuthentication;
