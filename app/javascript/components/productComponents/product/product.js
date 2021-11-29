
import React, {useState,useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";



const Product = () => {
  // set product state
  const [product, setProduct] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);
  let params = useParams();

  useEffect(() => {
    axios.get(`/api/v1/products/${params.slug}`)
    .then(res => {
      console.log(res.data);
      setProduct(res.data);
      setProductAttributes(res.data.product_attributes);
    })
    .catch(err => console.log(err));
  },[])
  const renderNeeded= () => {
    if(product.needed === true){
      return "Si"
    }else{
      return "No"
    }
  }
  const list = productAttributes.map(attribute => {
    return(
      <tr key={attribute.name}>
        <td>{attribute.name}</td>
        <td>{attribute.description}</td>
      </tr>
    )
  })
  return (
    <><Container>
      <Card >
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{product.product_type}</Card.Subtitle>
          <Card.Text>
            {product.description} 
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Datos de Inventario</Card.Subtitle>
          <Card.Text>
            Cantidad: {product.quantity} | Cantidad Minima: {product.minimum_quantity}
            Necesario: {renderNeeded()}
          </Card.Text>
          <Card.Link as={Link} to={`/products/edit/${product.slug}`}>Editar</Card.Link>
        </Card.Body>
      </Card>
    </Container>
    <Container>
      <h2>Atributos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </Table>
    </Container>
    </>
  );
}


export default Product;