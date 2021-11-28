import React, {useEffect,useState} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Order from "./order"
import Card from "react-bootstrap/Card";
const Client = () => {
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
    <>
      <Card>
        <Card.Body>
          <Card.Title>{client.name} {client.last_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Telefono: {client.phone_number}</Card.Subtitle>
          <Card.Text>
            {client.notes}.
          </Card.Text>
          <Card.Link as={Link} to= {`/clients/edit/${client.slug}`} >Editar</Card.Link>
        </Card.Body>
      </Card>
      <div className="Orders">
        <div className="OrderInfo">
          <h3>Orders:</h3>
          {list}
        </div>
      </div>
    </>
  );
};

export default Client;