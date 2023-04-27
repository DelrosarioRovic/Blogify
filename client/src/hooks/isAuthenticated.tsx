import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiCall from "../API/Api-call";
import { AuthState } from "../redux/reducer/authReducer"; 

export interface UserAccountInfo {
  _id: string;
  email: string;
  displayName: string;
  profilePicture: string | null;
}

const useAuthentication = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state: AuthState) => state.authenticated);
  const [data, setData] = useState<UserAccountInfo | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await ApiCall("GET", "http://localhost:4000/route/user");
        if (res.status === 200) {
          dispatch({ type: 'SET_AUTHENTICATED', payload: true });
          setData(res.data.user);
        } 
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, [dispatch]);

  const signIn = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
  };

  const signOut = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
  };

  return { authenticated, signIn, signOut, data };
};

export default useAuthentication;
