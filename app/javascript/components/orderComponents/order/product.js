import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Product = (props) => {
  return (
    <Card className="mb-3" >
    <Card.Header>{props.attributes.name}</Card.Header>
    <Card.Body>
      <Card.Title>${props.attributes.price}</Card.Title>
      <Card.Text>
        <p>Cantidad de Productos: {props.attributes.quantity} </p>
        <p>Precio Total: {props.attributes.compound_price} </p>
      </Card.Text>
      <Button as={Link} to={`/products/${props.attributes.slug}`}>Información del Producto</Button>
    </Card.Body>
  </Card>
  )
}



export default Product;