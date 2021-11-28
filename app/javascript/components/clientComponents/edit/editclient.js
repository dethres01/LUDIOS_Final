import React, {useState,useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import ClientForm from "../client_form/client_form";

const EditClient = () => {
  const [client, setClient] = useState({});
  //get param from url
  let params = useParams();
  //navigate to another page
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/v1/clients/${params.slug}`)
      .then(resp => {
        setClient(resp.data);
      })
      .catch(resp => console.log(resp));
  } , [])

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/v1/clients/${params.slug}`, client)
      .then(resp => {
        console.log(resp);
        navigate(`/clients/${resp.data.slug}`);
      })
      .catch(resp => console.log(resp));
  }
  return (
    <div>
      <h1>Edit Client</h1>
      <ClientForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        attributes={client}
      />
    </div>
  );
}

export default EditClient;