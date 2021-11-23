import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Product = (props) => {
  return (
    <Card>
    <Card.Header>{props.attributes.name}</Card.Header>
    <Card.Body>
      <Card.Title>${props.attributes.price}</Card.Title>
      <Card.Text>
        Cantidad de Productos: {props.attributes.quantity}| 
        Precio Total: {props.attributes.compound_price}
      </Card.Text>
      <Button as={Link} to={`/products/${props.attributes.slug}`}>Más Información</Button>
    </Card.Body>
  </Card>
  )
}



export default Product;