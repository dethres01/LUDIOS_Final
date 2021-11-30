import React, {useEffect,useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import Client from "../../clientComponents/clients/client";
import Product from "./product"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

const Order = () => {
  const [order, setOrder] = useState({});
  const [orderParams, setOrderParams] = useState({});
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
    return (
      <div key={product.name}>
        <Product
          attributes = {product} 
        />
      </div>
    )
  })
  const handleChange = (e) => {
    setOrderParams({...orderParams, [e.target.name]: e.target.value})
    setOrder({...order, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/v1/orders/${params.id}`, orderParams)
    .then(res => {
      console.log(res)
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handlePaidChange = (e) => {
    if (order.remaining_price-e.target.value <= 0) {
      checker(e.target.value)
      setOrderParams({...orderParams, paid: order.remaining_price})
    }else{

      setOrderParams({...orderParams, paid: e.target.value})
    }
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    })

  }
  const checker = (paid) => {
    if (order.remaining_price-paid < 0) {
      const remainder = paid-order.remaining_price
      return `El pago es mayor al monto pendiente. Se ha registrado una cantidad de ${remainder}`
      
    }else{
      return null
    }
  }

  return (
    <div>
      <Row>
        <Col>
        <Container>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Identificador: {order.id}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Estado: {localizeStatus(order.status)}</Card.Subtitle>
              <Card.Text>
                {order.description}
              </Card.Text>
              <Card.Subtitle className="mb-2 text-muted">Datos de la Orden</Card.Subtitle>
                  <Card.Text>Metodo de Pago: {localizePaymentMethod(order.payment_method)}</Card.Text>
                  <Card.Text>Total: ${order.total_price}</Card.Text>
                  <Card.Text>{checker(order.paid)}</Card.Text>
                  <Card.Text>Pagado: ${order.paid}</Card.Text>
                  <Card.Text>Restante: ${order.remaining_price}</Card.Text>
              <Card.Link as={Link} to={`/orders/edit/${order.id}`}>Editar</Card.Link>
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
      </Col>
      <Col>
        <h1>Edición de la Orden</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="PaidForm" className="">
          <Form.Label>Anticipos</Form.Label>
          <Form.Control
            className="m-2"
            type="number"
            placeholder="Escribe el monto de anticipos"
            name="paid"
            onChange={handlePaidChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="danger" type="submit" onClick={()=>{
          setOrderParams({status: "cancelled"})
        }}>
          Cancelar Orden
        </Button>
        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
        </Form>
      </Col>
      </Row>
    </div>
  );
}

export default Order;