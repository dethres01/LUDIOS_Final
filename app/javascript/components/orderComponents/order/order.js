import React, {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Client from "../../clientComponents/client/clients/client";
import Product from "./product"
const Order = () => {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [client, setClient] = useState({});

  let params = useParams();
  useEffect(() => {
    axios.get(`/api/v1/orders/${params.id}`)
    .then(res => {
      setOrder(res.data)
      setProducts(res.data.product_list)
      setClient(res.data.client)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const list = products.map(product => {
    console.log(product)
    return (
      <div key={product.name}>
        <Product
          attributes = {product} 
        />
      </div>
    )
  })
  return (
    <div>
      <h1>Order</h1>
      <div>
        <h2>Detalles del Pedido</h2>
        <div className="identifier">
          <h3>Identificador: {order.id}</h3>
        </div>
        <div className="status">
          <h3>Estado: {order.status}</h3>
        </div>
        <div className="Pricing">
          <h3>Metodo de Pago: {order.payment_method}</h3>
          <div className="total">
            <h3>Total: {order.total_price}</h3> 
          </div>
          <div className="Restante">
            <h3>Restante: {order.remaining_price}</h3>
            <h3>Pagado: {order.paid }</h3>
          </div>
          <div className="Comentarios">
            <h3>Comentarios: {order.description}</h3>
          </div>
        </div>
      </div>
      <div>
        <h2> Detalles del Cliente </h2>
        <Client
          attributes={client} 
        />
      </div>
      <div>
        <h2>Productos</h2>
        {list}
      </div>
    </div>
  );
}

export default Order;