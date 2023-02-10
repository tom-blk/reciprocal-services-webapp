import TrendingServicesList from "../../components/trending-services-list/trending-services-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import { useEffect } from "react";
import IncomingOrdersList from "../../components/incoming-orders-list/incoming-orders-list.component";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import OutgoingOrderList from "../../components/outgoing-orders-list/outgoing-orders-list.component";
import { OrderContext } from "../../context/order.context";

const Home = () => {

  const { testUser } = useContext(UserContext)
  const { displayError } = useContext(AlertMessageContext);
  const { getAndSetOrderWithSpecificStatusAndDirection, outgoingOrders, incomingOrders } = useContext(OrderContext)

  useEffect(() => {
    getAndSetOrderWithSpecificStatusAndDirection(testUser.id, 'incoming', 'new', displayError);
    getAndSetOrderWithSpecificStatusAndDirection(testUser.id, 'outgoing', 'fulfilled', displayError);
  }, [])

  return (
    <PageContainer>
      <h1>home</h1>
      <h2>trending services</h2>
      <TrendingServicesList/>
      <h2>incoming orders</h2>
      <IncomingOrdersList completed={false} orders={incomingOrders.new}/>
      <h2>updates on your outgoing orders</h2>
      <OutgoingOrderList completed={false} orders={outgoingOrders.fulfilled}/>
    </PageContainer>
  );
}

export default Home