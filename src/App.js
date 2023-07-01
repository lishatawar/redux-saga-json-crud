import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import AddEditUser from './pages/AddEditUser';
import UserInfo from './pages/UserInfo';
import Header from './component/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <ToastContainer/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/addUser" Component={AddEditUser} />
        <Route path="/editUser/:id" Component={AddEditUser} />
        <Route path="/userInfo/:id" Component={UserInfo} />
        <Route path="/about" Component={About} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
