import React,{useState} from "react";
import axios from "axios";
import ClientForm from "../client_form/client_form"
import {useNavigate} from "react-router-dom"



const NewClient = () => {
  const [client, setClient] = useState({})
  const navigate = useNavigate()
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
      navigate(`/clients/${response.data.slug}`)  
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <div>
      <h1>New Client</h1>
      <ClientForm
       handleChange={handleChange}
       handleSubmit={handleSubmit}
       attributes = {{}}
      />
    </div>
  );
}

export default NewClient;