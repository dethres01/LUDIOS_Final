import React, {useState,useEffect} from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
import Product from "./product"


const Products = () => {
  // set product state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/products")
    .then(res => {
      console.log(res.data);
      setProducts(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },[]);
  const handleClickTrue = (e) => {
    console.log("se necesitan");
    axios.get("/api/v1/products?needed=true")
    .then(res => {
      console.log(res.data);
      setProducts(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  const handleClickFalse = (e) => {
    axios.get("/api/v1/products?needed=false")
    .then(res => {
      console.log(res.data);
      setProducts(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  const handleClickAll = (e) => {
    console.log("todos");
    axios.get("/api/v1/products")
    .then(res => {
      console.log(res.data);
      setProducts(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  const list = products.map(product => {
    return (
      <div key={product.slug}>
        <Product
          attributes={product} 
        />
      </div>
    )
  })
  return (
    <div>
      <h1>Products</h1>
      <Container className="d-flex justify-content-center mb-3" >
        <Button variant="danger" onClick={handleClickTrue} className="me-4">
          Filtrar por necesitados
        </Button>
        <Button variant="success" onClick={handleClickFalse} className="me-4">
          Filtrar por disponibles
        </Button>
        <Button variant="warning" onClick={handleClickAll}>
          Todos los Productos
        </Button>
      </Container>
      <div>
        {list}
      </div>

    </div>
  );
}

export default Products;