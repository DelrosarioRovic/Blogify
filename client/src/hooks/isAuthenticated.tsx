import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiCall from "../API/Api-call";
import { AuthState } from "../redux/reducer/authReducer"; 
import { incrementRefreshCount } from "../redux/reducer/reUpdateUser";

// interface hook
import { AuthUserInfo } from '../interface/hook/AuthUserInfo';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state: { authReducer: AuthState }) => state.authReducer.authenticated);
  const refreshCount = useSelector((state: any) => state.reUpdateUserData.refreshCount);

  const [data, setData] = useState<AuthUserInfo | null>(null);

  const checkAuth = async () => {
    try {
      const res = await ApiCall("GET", "https://blogify-api-server.vercel.app/route/user");
      if (res.status === 200) {
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        setData(res.data.user);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [dispatch, authenticated, refreshCount]);

  const signIn = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
  };

  const signOut = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
  };

  const handleReUpdateUserData = () => {
    dispatch(incrementRefreshCount());
  };

  return { authenticated, signIn, signOut, data, handleReUpdateUserData };
};

export default useAuthentication;
