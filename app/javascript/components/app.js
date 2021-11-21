import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './home/home';
import Clients from './clients/clients';
import Client from './client/client';


const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/clients" element={<Clients/>} />
    <Route path="/clients/:slug" element={<Client/>} />
  </Routes>);
}

export default App;