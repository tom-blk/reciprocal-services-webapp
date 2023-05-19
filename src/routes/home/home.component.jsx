import PageContainer from "../../utils/page-container/page-container.component";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import OrderList from "../../components/orders-list/orders-list.component";
import { OrderContext } from "../../context/order.context";
import ServicesList from "../../components/services-list/services-list.component";
import { getTrendingServices } from "../../api/services/read";

const Home = () => {

  const { user } = useContext(UserContext)
  const { displayError } = useContext(AlertMessageContext);
  const { getAndSetOrderWithSpecificStatusAndDirection, outgoingOrders, incomingOrders } = useContext(OrderContext)
  
  const [trendingServices, setTrendingServices] = useState([]);

  useEffect(() => {
    getAndSetOrderWithSpecificStatusAndDirection(user.id, 'incoming', 'new', displayError);
    getAndSetOrderWithSpecificStatusAndDirection(user.id, 'outgoing', 'fulfilled', displayError);
    getTrendingServices(displayError).then(response => setTrendingServices(response));
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