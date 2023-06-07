import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router/router";
import Footer from "./components/footer/footer";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="w-full min-h-screen max-w-4xl mx-auto">
        <Header />
        <div className="pt-20">
          <Router />
        </div>
        <ToastContainer style={{ fontSize: "14px" }} />
      </div>
      <Footer />
    </Provider>
  );
};

export default App;
