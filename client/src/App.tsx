import React, { useState } from 'react';
import Header from './components/header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App:React.FC= () => {

  return (
    <div className='w-full h-screen'>
      <Header />
      <ToastContainer style={{ fontSize: "14px" }} />
    </div>
  )
}

export default App
