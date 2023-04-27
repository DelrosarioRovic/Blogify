import React, {useState} from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './components/router/router';

const App:React.FC= () => {
  return (
    <Provider store={store}>
    <div className='w-full h-screen max-w-7xl mx-auto max-xl:px-6'>
      <Header />    
      <Router />
      <ToastContainer style={{ fontSize: "14px" }} />
    </div>
    </Provider>
  )
}

export default App
