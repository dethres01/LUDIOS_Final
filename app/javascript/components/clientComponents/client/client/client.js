import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Order from "./order"
const Client = (props) => {
  const [client, setClient] = useState({});
  const [orders, setOrders] = useState([]);

  let params = useParams();
  useEffect(() => {
    axios.get(`/api/v1/clients/${params.slug}`)
      .then(resp => {
        setClient(resp.data);
        setOrders(resp.data.orders);
      })
      .catch(resp => console.log(resp));
  }, []);
  const list = orders.map(order => {
    return (
      <div key={order.id}>
        <Order 
          attributes={order} 
        />
      </div>
    )
  })
  return (
    <div className="container">
      <div className= "ClientName">
        <h1>{client.name} {client.last_name}</h1>
      </div>
      <div className="ClientInfo">
        <div className="PhoneNumber">
          <h3>Phone Number:</h3>
          <p>{client.phone_number}</p>
        </div>
        <div className="ClientNotes">
          <h3>Notes:</h3>
          <p>{client.notes}</p>
        </div>
      </div>
      <div className="OrderInfo">
        <h3>Orders:</h3>
        {list}
      </div>
    </div>
  );
};

export default Client;