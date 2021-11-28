import React, {useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import Client from './client';
import SearchBar from '../../misc/searchbar/searchbar';

const Clients = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    //Get all clients from api
    //update clients on our state
    axios.get('/api/v1/clients')
    .then( resp => {
      setClients(resp.data);
    })
    .catch(resp => console.log(resp));
  }, []);
  const handleChange = (e) => {
;
    axios.get(`/api/v1/clients?search=${e.target.value}`)
    .then( resp => {
      setClients(resp.data);
    })
    .catch(resp => console.log(resp));
  }
  const list = clients.map(client => {
    return (
      <div key = {client.slug}>

        <Client
        attributes={client}
        />
      </div>

    )
  })
  return (
    <div className="container">
      <div className="Header">
        <div className="Subheader">
        </div>
      </div>
      <div className="SearchBar">
        < SearchBar 
          handleChange = {handleChange}
        />
      </div>
      <div className="Clients Listing">
        {list}
      </div>
    </div>
  );
};


export default Clients;