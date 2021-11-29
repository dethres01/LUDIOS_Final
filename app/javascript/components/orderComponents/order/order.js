import React, {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Client from "../../clientComponents/clients/client";
import Product from "./product"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container";

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
  const localizeStatus = (status) => {
    switch (status) {
      case "ongoing":
        return "Pendiente"
      case "completed":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      default:
        return "Desconocido"
    }
  }
  const localizePaymentMethod = (payment_method) => {
    switch (payment_method) {
      case "cash":
        return "Efectivo"
      case "deposit":
        return "Deposito"
      default:
        return "Desconocido"
    }
  }
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
      <Container>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Identificador: {order.id}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Estado: {localizeStatus(order.status)}</Card.Subtitle>
            <Card.Text>
              {order.description}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">Datos de la Orden</Card.Subtitle>
            <Card.Text>
                <p>Metodo de Pago: {localizePaymentMethod(order.payment_method)}</p>
                <p>Total: ${order.total_price}</p>
                <p>Pagado: ${order.paid}</p>
                <p>Restante: ${order.remaining_price}</p>
            </Card.Text>
            <Card.Link href="#">Editar</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Container>
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