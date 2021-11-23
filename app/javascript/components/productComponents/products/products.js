import React, {useState,useEffect} from "react";
import axios from "axios";
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
      {list}
    </div>
  );
}

export default Products;