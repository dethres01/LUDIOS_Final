// react functional component
import React,{useState,useEffect} from 'react';
import ProductForm from '../product_form/product_form';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';




const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [select, setSelected] = useState('');
  //console.log(product)
  let params = useParams();
  const navigate = useNavigate();
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
  useEffect(() => {
    axios.get(`/api/v1/products/${params.slug}`)
    .then(res => {
      //console.log(res.data);
      setProduct(res.data);
      setProductAttributes(res.data.product_attributes);
      setSelected(res.data.product_type);
    })
    .catch(err => {
      console.log(err);
    });
  } ,[]);
  const list = productTypes.map(type => {
    return {value: type.id, label: type.name};
  })
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({...product, [name]: value});
  }
  const handleSelectChange = (e) => {
    console.log(e);
    const name = "product_type_id"
    const value = e.value
    setProduct({...product, [name]: value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/v1/products/${params.slug}`, product)
      .then(res => {
        console.log(res.data);
        navigate(`/products/${res.data.slug}`);
      }
      )
      .catch(err => console.log(err));
  }
  const handleAttributeChange = (e, index) => {
    const {name, value} = e.target;
    const newAttributes = [...productAttributes];
    newAttributes[index][name] = value;
    setProductAttributes(newAttributes);
    setProduct({...product, product_attributes_attributes: newAttributes})
    console.log(product);
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
  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm
        select={select}
        list={list}
        productAttributes={productAttributes}
        attributes = {product}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
        handleAttributeChange={handleAttributeChange}
        addAttribute={addAttribute}
        removeAttribute={removeAttribute}
      />
    </div>
  );
}

export default EditProduct;