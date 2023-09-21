import { useEffect, useState, useContext } from "react";

import { OrderContext } from "../../context/order.context";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import PageContainer from "../../utils/page-container/page-container.component";
import OrderList from "../../components/card-lists/orders-list/orders-list.component";
import ServicesList from "../../components/card-lists/services-list/services-list.component";

import { getTrendingServices } from "../../api/services/read";

const Home = () => {

  const { user } = useContext(UserContext)
  const { displayError } = useContext(AlertMessageContext);
  const { getAndSetOrderWithSpecificStatusAndDirection, outgoingOrders, incomingOrders } = useContext(OrderContext)
  
  const [trendingServices, setTrendingServices] = useState([]);

  useEffect(() => {
    getAndSetOrderWithSpecificStatusAndDirection(user.id, 'incoming', 'new', displayError);
    getAndSetOrderWithSpecificStatusAndDirection(user.id, 'outgoing', 'fulfilled', displayError);
    getTrendingServices()
      .then(response => setTrendingServices(response))
      .catch(error => displayError(error))
  }, [])

  return (
    <PageContainer>
      <h1>home</h1>
      <h2>trending services</h2>
      <ServicesList services={trendingServices}/>
      <h2>incoming orders</h2>
      <OrderList completed={false} orders={incomingOrders.new}/>
      <h2>updates on your outgoing orders</h2>
      <OrderList completed={false} orders={outgoingOrders.fulfilled}/>
    </PageContainer>
  );
}

export default Home