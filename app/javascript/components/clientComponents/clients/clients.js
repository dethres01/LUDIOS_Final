import React, {useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import Client from './client';

const Clients = () => {
  const [clients, setClients] = useState([]);
  console.log(clients);
  useEffect(() => {
    //Get all clients from api
    //update clients on our state
    axios.get('/api/v1/clients')
    .then( resp => {
      setClients(resp.data);
    })
    .catch(resp => console.log(resp));
  }, []);
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
      <div>
        {list}
      </div>
    </div>
  );
};


export default Clients;