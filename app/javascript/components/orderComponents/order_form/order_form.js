import React, {useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
const OrderForm = () => {
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [orderItems, setOrderItems] = useState([{}]);
    const [order, setOrder] = useState({});
    
    const navigate = useNavigate();
    useEffect(() => {
      axios.get("/api/v1/products")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      axios.get("/api/v1/clients")
      .then(res => {
        console.log(res.data);
        setClients(res.data);
      }
      )
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
    const select = () => {
    }
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setOrder({...order, [name]: value});
      console.log(order);

    }
    const handleSelectChange = (e) => {
      const name = "payment_method"
      const value = e.target.value
      setOrder({...order, [name]: value});
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(order);
      console.log(orderItems);
      axios.post("/api/v1/orders", order)
      .then(res => {
        console.log(res);
        navigate("/orders");
      })
      .catch(err => {
        console.log(err);
      })
    }
  
    const addItem = () => {
      const newItem = {
        product_id: "",
        quantity: ""
      };
      setOrderItems([...orderItems, newItem]);
    }
    const removeItem = (index) => {
      const newItems = [...orderItems];
      newItems.splice(index, 1);
      setOrderItems(newItems);
    }
    const handleItemSelect = (e, index) => {
      const name = "product_id";
      const value = e.value;
      const newItems = [...orderItems];
      newItems[index][name] = value;
      setOrderItems(newItems);
      setOrder({...order, order_items_attributes: newItems});
      console.log(orderItems);
    }
    const handleItemChange = (e, index) => {
      const name = e.target.name;
      const value = e.target.value;
      const newItems = [...orderItems];
      newItems[index][name] = value;
      setOrderItems(newItems);
      setOrder({...order, order_items_attributes: newItems});
      console.log(orderItems);
    }
    const clientOptions = clients.map(client => {
      return {
        value: client.id,
        label: `${client.name} ${client.last_name}`
      }
    })
    const handleClientChange = (e) => {
      const name = "client_id";
      const value = e.value;
      setOrder({...order, [name]: value});
    }
    const nestedFields = orderItems.map((item, index) => {
      return (
      <Row key={index}>
      <Form.Group as={Col} >
        <Form.Label>Product</Form.Label>
        <Select
          options={options}
          onChange={(e) => handleItemSelect(e, index)}
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Cantidad</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          defaultValue={item.quantity}
          onChange={(e) => handleItemChange(e, index)}
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
            if (orderItems.length > 1) {
              removeItem(index);
            }else{
              alert('Debe de haber por lo menos un atributo');
            }
          }}
        >
          Remover Producto
        </Button>
      </Col>
      </Row>
      )
    }
    )
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control 
              as="textarea"
              name="description"
              defaultValue={/*props.attributes.description}*/""} 
              placeholder="Descripcion" 
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="formPaymentMethod" className="mb-3" >
            <Form.Label>Metodo de pago</Form.Label>
            <Form.Select
              onChange={handleSelectChange}
            >
              <option value="cash">Efectivo</option>
              <option value="deposit">Deposito</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formClient">
            <Form.Label>Cliente</Form.Label>
            <Select
              options={clientOptions}
              onChange={(e) => handleClientChange(e)}
            />
          </Form.Group>

          <div>
            <h3>Productos</h3>
            <Button
              variant="success"
              onClick={() => {
                addItem()
              }}
            >
              Agregar producto
            </Button>
            {nestedFields}
          </div>
          <Button
            variant="success"
            type="submit"
          >
            Crear orden
          </Button>
        </Form>
      </Container>
    </div>


  );
}

export default OrderForm;