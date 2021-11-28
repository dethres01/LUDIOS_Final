import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import axios from "axios";
const ClientForm = (props) => {

  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Nombre del Cliente</Form.Label>
        <Form.Control 
        onChange={props.handleChange} 
        type="text" 
        placeholder="Ingrese el nombre" 
        name="name"
        defaultValue={props.attributes.name}/>
        <Form.Text className="text-muted">
          El nombre/nombres del cliente.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Apellido(s) del Cliente</Form.Label>
        <Form.Control 
        onChange={props.handleChange} 
        name="last_name" 
        type="text" 
        placeholder="Ingrese el/los apellidos" 
        defaultValue={props.attributes.last_name}/>
        <Form.Text className="text-muted">
          El apellido del cliente.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Numero De Telefono</Form.Label>
        <Form.Control 
        onChange={props.handleChange} 
        name="phone_number" 
        type="text" 
        placeholder="Número de Teléfono"
        defaultValue={props.attributes.phone_number} />
        <Form.Text className="text-muted">
          Telefono del cliente.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel  label="Notas del Cliente">
          <Form.Control
            as="textarea"
            placeholder="Cualquier nota o comentario va aqui"
            style={{ height: '100px' }}
            onChange={props.handleChange} 
            name="notes"
            defaultValue={props.attributes.notes}
          />
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ClientForm;