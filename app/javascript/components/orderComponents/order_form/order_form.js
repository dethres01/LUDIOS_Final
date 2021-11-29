import React, {useEffect,useState} from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';
import axios from "axios";
const OrderForm = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      axios.get("/api/v1/products")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    },[])

    const options = products.map(product => {
      return {
        value: product.id,
        label: product.name
      }
    })
    const already_rendered = [
      {
        value: "pene",
        label: "pene"
      },
      {
        value: "pene2",
        label: "pene2"
      }
    ]
  return (
    <div>
      <Container>
        <Form>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control 
              as="textarea"
              name="description"
              defaultValue={/*props.attributes.description}*/""} 
              placeholder="Descripcion" />
          </Form.Group>
          <Form.Group controlId="formPaymentMethod" className="mb-3" >
            <Form.Label>Metodo de pago</Form.Label>
            <Form.Select>
              <option value="cash">Efectivo</option>
              <option value="deposit">Deposito</option>
            </Form.Select>
          </Form.Group>
          <Select
            defaultValue={already_rendered[0]}
            options={already_rendered}
          />
        </Form>
      </Container>
    </div>


  );
}

export default OrderForm;