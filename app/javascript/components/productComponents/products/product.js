import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const setNeededColor = () => {
    if (props.attributes.needed === true) {
      return "danger"
    } else {
      return "success"
    }
  }
  return (
    <Card border={setNeededColor()}>
    <Card.Header>{props.attributes.name}</Card.Header>
    <Card.Body>
      <Card.Title>${props.attributes.price}</Card.Title>
      <Card.Text>
        Cantidad de Productos: {props.attributes.quantity}
      </Card.Text>
      <Card.Text>
        {props.attributes.description}
      </Card.Text>
      <Button as={Link} to={`/products/${props.attributes.slug}`}>Más Información</Button>
    </Card.Body>
  </Card>
  )
}



export default Product;