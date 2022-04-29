import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Guild from './tsx/Guild';
import Header from './tsx/Header';
import Login from './tsx/Login';
import Logout from './tsx/Logout';
import Main from './tsx/Main';
import Notfound from "./tsx/Notfound";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Header />
    <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/guild/:guildId' element={<Guild />} />
        <Route path='*' element={<Notfound />} />
    </Routes>
  </BrowserRouter>
);