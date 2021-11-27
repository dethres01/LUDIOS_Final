import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'



const Order = (props) => {
  const getColorBorder = () => {
    
    if (props.attributes.status === 'ongoing') {
      return "warning"
    } else if (props.attributes.status === 'completed') {
      return "success"
    } else if (props.attributes.status === 'cancelled') {
      return "danger"
    } else {
      return "primary"
    }
  }
  return(
    <Card border={getColorBorder()}>
      <Card.Header>Identificador: {props.attributes.id}</Card.Header>
      <Card.Body>
        <Card.Title>Status: {props.attributes.status}</Card.Title>
        <Card.Text>
        </Card.Text>
        <Button as={Link} to={`/orders/${props.attributes.id}`}>Más Información</Button>
      </Card.Body>
    </Card>
  )

}

export default Order