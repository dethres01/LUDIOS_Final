import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";



const Client = (props) => {
  return (
      <Card>
        <Card.Header>{props.attributes.name} {props.attributes.last_name}</Card.Header>
        <Card.Body>
          <Card.Title>{props.attributes.phone_number}</Card.Title>
          <Card.Text>
            {props.attributes.notes}
          </Card.Text>
          <Button as={Link} to={`/clients/${props.attributes.slug}`}>Más Información</Button>
        </Card.Body>
      </Card>
  );
}

export default Client;