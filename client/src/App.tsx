import React, {useState} from 'react';
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './components/router/router';

const App:React.FC= () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
      <ToastContainer style={{ fontSize: "14px" }} />
    </div>
  )
}

export default App
