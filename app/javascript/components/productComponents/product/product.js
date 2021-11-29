
import React, {useState,useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";



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
      <div key={attribute.name}>
        <p>{attribute.name}</p>
        <p>{attribute.description}</p>
      </div>
    )
  })
  return (
    <div>
      <div>
        <Button as={Link} to={`/products/edit/${product.slug}`}>Editar</Button>
      </div>
      <div className="header">
        <h1>{product.slug}</h1>
      </div>
      <div className="Product Container">
          <div className="Product Name">
            <h3>{product.name}</h3>
          </div>
          <div className="Product Price">
            <h3>${product.price}</h3>
          </div>
          <div className="Product Description">
            <h3>{product.product_type}</h3>
            <p>{product.description}</p>
          </div>
          <div className="Product Inventory Info">
            <h3>Cantidad Actual: {product.quantity}</h3>
            <h3>Cantidad Mínima: {product.minimum_quantity}</h3>
            <h3>Se necesita?: {renderNeeded()}</h3>
          </div>
          <div className="Product Attributes">
            <h3>Atributos</h3>
            {list}
          </div>
      </div>
    </div>
  );
}


export default Product;