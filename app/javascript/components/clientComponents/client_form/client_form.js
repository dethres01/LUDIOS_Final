import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import axios from "axios";
const ClientForm = () => {
  const [client, setClient] = useState({})
  // at the moment we just want to render a form  for client *creation*
  const handleChange = (event) => {
    event.preventDefault();
    setClient(Object.assign({}, client, {[event.target.name]: event.target.value}))
    console.log(client)
  }
  const handleSubmit = (event) => {
    console.log(client)
    event.preventDefault();
    axios.post("/api/v1/clients",client)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Nombre del Cliente</Form.Label>
        <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el nombre" name="name"/>
        <Form.Text className="text-muted">
          El nombre/nombres del cliente.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Apellido(s) del Cliente</Form.Label>
        <Form.Control onChange={handleChange} name="last_name" type="text" placeholder="Ingrese el/los apellidos" />
        <Form.Text className="text-muted">
          El apellido del cliente.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Numero De Telefono</Form.Label>
        <Form.Control onChange={handleChange} name="phone_number" type="text" placeholder="Número de Teléfono" />
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
            onChange={handleChange} 
            name="notes"
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