import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from "../redux/reducer/authReducer"; 
import { incrementRefreshCount } from "../redux/reducer/reUpdateUser";
import axios from 'axios';
import { AuthUserInfo } from '../interface/hook/AuthUserInfo';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const authenticated = useSelector((state: { authReducer: AuthState }) => state.authReducer.authenticated);
  const refreshCount = useSelector((state: any) => state.reUpdateUserData.refreshCount);
  const [data, setData] = useState<AuthUserInfo | null>(null);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (params.token) {
        localStorage.setItem('token', params.token);
      }

      let token = localStorage.getItem('token');

      if (token) {
        const res = await axios.get('https://blogify-api-server.vercel.app/route/user', {
          headers: { Authorization: token },
        });
        if (res.status === 200) {
          dispatch({ type: 'SET_AUTHENTICATED', payload: true });
          setData(res.data.user);
        } 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [dispatch, authenticated, refreshCount]);

  const signIn = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
  };

  const handleReUpdateUserData = () => {
    dispatch(incrementRefreshCount());
  };

  return { authenticated, signIn, signOut, data, handleReUpdateUserData, loading };
};

export default useAuthentication;
