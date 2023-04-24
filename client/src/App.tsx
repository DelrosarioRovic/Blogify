import React, {useState} from 'react';
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './components/router/router';

const App:React.FC= () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <div className='w-full h-screen max-w-7xl mx-auto max-xl:px-6'>
      <Header 
       isLogin={isLogin}
       setIsLogin={setIsLogin}
      />    
      <Router 
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      <ToastContainer style={{ fontSize: "14px" }} />
    </div>
  )
}

export default App
