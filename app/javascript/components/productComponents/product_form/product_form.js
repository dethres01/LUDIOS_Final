
import React, {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import axios from 'axios';


const ProductForm = (props) => {
  const [productTypes, setProductTypes] = useState([]);
  // sent by props
  //const [productAttributes, setProductAttributes] = useState([{name:'',description:''}]);
  useEffect(() => {
    axios.get('/api/v1/types')
      .then(res => {
        console.log(res.data);
        setProductTypes(res.data);
        
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  const nestedFields = props.productAttributes.map((attribute, index) => {
    return (
      <Row key={index}>
      <Form.Group as={Col} >
        <Form.Label>Atributo</Form.Label>
        <Form.Control
          type="text"
          name="name"
          defaultValue={attribute.name}
          onChange={(e) => props.handleAttributeChange(e, index)}
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Descripcion</Form.Label>
        <Form.Control
          type="text"
          name="description"
          defaultValue={attribute.description}
          onChange={ (e) => props.handleAttributeChange(e, index) }
        />
      </Form.Group>
      <Col>
        <div className="mb-2">
          <br />
        </div>
        <Button
          className="align-bottom"
          variant="danger"
          onClick={() => {
            if (props.productAttributes.length > 1) {
              props.removeAttribute(index);
            }else{
              alert('Debe de haber por lo menos un atributo');
            }
          }}
        >
          Remove Attribute
        </Button>
      </Col>
      </Row>
    );
  })
  const list = productTypes.map(type => {
    return {value: type.id, label: type.name};
  })
  return (
    <Container>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Escribe el nombre del producto"
            name="name"
            defaultValue={props.attributes.name}
            onChange={props.handleChange} 
          />
          <Form.Text className="text-muted">
            será el nombre con el que se identificara el producto
          </Form.Text>
        </Form.Group>
        <Row>
          <Form.Group as={Col} controlId="formPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Escribe el precio del producto"
              name="price"
              defaultValue={props.attributes.price}
              onChange={props.handleChange} 
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formQuantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Escribe la cantidad del producto existente"
              name="quantity"
              defaultValue={props.attributes.quantity}
              onChange={props.handleChange} 
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formMinimumQuantity">
            <Form.Label>Cantidad mínima</Form.Label>
            <Form.Control
              type="number"
              placeholder="Escribe la cantidad mínima del producto"
              name="minimum_quantity"
              defaultValue={props.attributes.minimum_quantity}
              onChange={props.handleChange} 
            />
          </Form.Group>
        </Row>
        <Form.Group controlId="formDescription" className="mb-3" >
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Escribe una descripción del producto"
            name="description"
            defaultValue={props.attributes.description}
            onChange={props.handleChange} 
          />
        </Form.Group>
        <div className="mb-3">
          <h3>Tipo de producto</h3>
          <Select
          defaultInputValue = { props.attributes.product_type }
          name = "product_type_id" 
          options={list}
          onChange={props.handleSelectChange} />
        </div>
        <div className="mb-3">
          <h3>Atributos</h3>
          <Button
          variant="success"
          onClick={() => {
            props.addAttribute();
          }}
          >
          Agregar atributo
          </Button>
          {nestedFields}
        </div>
        <Button variant="primary" type="submit">
          Confirmar
        </Button>
      </Form>
    </Container>
  );
}

export default ProductForm;