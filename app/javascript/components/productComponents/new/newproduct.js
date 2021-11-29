import React,{useState,useEffect} from "react";
import ProductForm from "../product_form/product_form";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const NewProduct = () => {
  const [productAttributes, setProductAttributes] = useState([{name:'',description:''}]);
  const [product, setProduct] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const [select] = useState('camisa');
  useEffect(() => {
    axios.get('/api/v1/types')
      .then(res => {
        //console.log(res.data);
        setProductTypes(res.data);

        
      })
      .catch(err => {
        console.log(err);
      });
  },[]);
  const navigate = useNavigate();
  const handleChange = (e) => {

    const {name, value} = e.target;
    setProduct({...product, [name]: value});
  }
  const handleSelectChange = (e) => {
    const name = "product_type_id"
    const value = e.value
    setProduct({...product, [name]: value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    

    axios.post('/api/v1/products', product)
      .then(res => {
        console.log(res);
        navigate(`/products/${res.data.slug}`);
      }
      )
      .catch(err => {
        console.log(err);
      }
      );
  }
  const addAttribute = () => {
    const newAttribute = {
      name: '',
      description: '',
    };
    setProductAttributes([...productAttributes, newAttribute]);
  }
  const removeAttribute = (index) => {
    const newAttributes = [...productAttributes];
    newAttributes.splice(index, 1);
    setProductAttributes(newAttributes);
  }
  const handleAttributeChange = (e, index) => {
    const {name, value} = e.target;
    const newAttributes = [...productAttributes];
    newAttributes[index][name] = value;
    setProductAttributes(newAttributes);
    setProduct({...product, product_attributes_attributes: newAttributes})
    console.log(product);
  }
  const list = productTypes.map(type => {
    return {value: type.id, label: type.name};
  })
  return (
    <div>
      <h1>New Product</h1>
      <ProductForm
        select={select}
        list={list}
        productAttributes={productAttributes}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        addAttribute={addAttribute}
        removeAttribute={removeAttribute}
        handleAttributeChange={handleAttributeChange}
        handleSelectChange={handleSelectChange}
        attributes={{}} 
      />
    </div>
  );
}


export default NewProduct;