import TrendingServicesList from "../../components/trending-services-list/trending-services-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import { useEffect } from "react";
import IncomingOrdersList from "../../components/incoming-orders-list/incoming-orders-list.component";
import { getIncomingOrders } from "../../api/transactions/get-incoming-orders";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import { useState } from "react";
import { getActionableOutgoingOrders } from "../../api/transactions/get-outgoing-orders";
import OutgoingOrderList from "../../components/outgoing-orders-list/outgoing-orders-list.component";

const Home = () => {

  const { testUser } = useContext(UserContext)
  const { displayError } = useContext(AlertMessageContext);

  const [incomingOrders, setIncomingOrders] = useState([]);
  const [actionableOutgoingOrders, setActionableOutgoingOrders] = useState([]);

  useEffect(() => {
    getIncomingOrders(testUser.id, displayError).then(response => setIncomingOrders(response));
    getActionableOutgoingOrders(testUser.id, displayError).then(response => setActionableOutgoingOrders(response))
  }, [])

  return (
    <PageContainer>
      <div className="heading-primary">home</div>
      <div className="heading-secondary">trending services</div>
      <TrendingServicesList/>
      <div className="heading-secondary">incoming orders</div>
      <IncomingOrdersList completed={false} orders={incomingOrders}/>
      <div className="heading-secondary">updates on your outgoing orders</div>
      <OutgoingOrderList completed={false} orders={actionableOutgoingOrders}/>
    </PageContainer>
  );
}

export default Home