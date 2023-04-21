import React, { useState } from 'react';
import Header from './components/header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Compose from './components/compose/compose';

const App:React.FC= () => {

  return (
    <div className='w-full h-screen'>
      <Header />
      <Compose />
      <ToastContainer style={{ fontSize: "14px" }} />
    </div>
  )
}

export default App
