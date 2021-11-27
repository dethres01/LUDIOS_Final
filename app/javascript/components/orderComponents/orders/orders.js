import React, {useEffect,useState} from "react";
import axios from "axios";
import Order from "../../clientComponents/client/order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/orders")
    .then(res => {
      console.log(res.data);
      setOrders(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  const list = orders.map(order => {
    return(
      <div key={order.id}>
        <Order
          attributes={order}
        />
      </div>
    )
  })
  return (
    <div>
      <h1>Orders</h1>
      {list}
    </div>
  ); 
}


export default Orders;