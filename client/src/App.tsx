import React, {useState} from 'react';
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './components/router/router';

const App:React.FC= () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <div className='w-full min-h-screen max-w-4xl mx-auto'>
      <Header 
       isLogin={isLogin}
       setIsLogin={setIsLogin}
      /> 
      <div className='pt-24'>
      <Router 
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
        </div>   
   
      <ToastContainer style={{ fontSize: "14px" }} />
    </div>
  )
}

export default App
