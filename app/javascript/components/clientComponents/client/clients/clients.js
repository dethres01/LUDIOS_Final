import React, {useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navigation from '../../../misc/navbar/navbar';

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    //Get all clients from api
    //update clients on our state
    axios.get('/api/v1/clients')
    .then( resp => {
      //console.log(resp.data);
      setClients(resp.data);
      console.log(clients);
    })
    .catch(resp => console.log(resp));
  }, [clients.length]);
  const list = clients.map(client => {
    return (
      <div key={client.name} >
        <p>{client.phone_number}</p>
      </div>
    )
  })
  return (
    <Fragment>
      <div className="Header">

      </div>
    </Fragment>
  );
};


export default Clients;