import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './home/home';
import Clients from './clientComponents/clients/clients';
import Client from './clientComponents/client/client';
import OrderForm from './orderComponents/order_form/order_form';
import Order from './orderComponents/order/order';
import Orders from './orderComponents/orders/orders';
import Products from './productComponents/products/products';
import Product from './productComponents/product/product';
import ProductForm from './productComponents/product_form/product_form';
import NewClient from './clientComponents/new/newclient';
import EditClient from './clientComponents/edit/editclient';



const App = () => {
  return (
  <Routes>

    {/*static routes*/ }
    <Route path="/" element={<Home/>} />
    {/*client routes*/ }
    <Route path="/clients" element={<Clients/>} />
    <Route path="/clients/:slug" element={<Client/>} />
    <Route path="/clients/new" element={<NewClient/>} />
    <Route path="/clients/edit/:slug" element={<EditClient/>} />
    {/*order routes*/ }
    <Route path="/orders" element={<Orders/>} />
    <Route path="/orders/:id" element={<Order/>} />
    <Route path="/orders/new" element={<OrderForm/>} />
    {/*Product routes*/ }
    <Route path="/products" element={<Products/>} />
    <Route path="/products/:slug" element={<Product/>} />
    <Route path="/products/new" element={<ProductForm/>} />


  </Routes>);
}

export default App;