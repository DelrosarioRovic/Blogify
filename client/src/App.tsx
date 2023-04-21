import React, { useState } from 'react';
import Header from './components/header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './components/router/router';
import Compose from './components/compose/compose';

const App:React.FC= () => {

  return (
    <div className='w-full h-screen max-w-7xl mx-auto max-xl:px-6'>
      <Header />
      <Compose />
      <ToastContainer style={{ fontSize: "14px" }} />
      <Router />
    </div>
  )
}

export default App
