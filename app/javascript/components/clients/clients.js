import React, {useState,useEffect,Fragment} from 'react';
import axios from 'axios';

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
      <h1>Clients</h1>
      <div>
        {list}
      </div>
    </Fragment>
  );
};


export default Clients;