import React, { useEffect, useState } from "react";

import PageContainer from "../../utils/page-container/page-container.component";
import OrdersList from "../../components/card-lists/orders-list/orders-list.component";
import ServicesList from "../../components/card-lists/services-list/services-list.component";

import { getTrendingServices } from "../../api/services/read";
import useFetchOrders from "../../hooks/useFetchOrders";
import { toast } from "react-toastify";
import { errorMessageOptions } from '../../components/alerts/alertMessageTypes'

import 'react-toastify/dist/ReactToastify.css';
import AlertMessageComponent from "../../components/alerts/alert-message.component";

const Home = () => {

  const incomingOrders = useFetchOrders('incoming');
  const outgoingOrders = useFetchOrders('outgoing');
  
  const [trendingServices, setTrendingServices] = useState([]);

  useEffect(() => {
    getTrendingServices()
      .then(response => setTrendingServices(response))
      .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
  }, [])

  return (
    <PageContainer>
      <h1>home</h1>
      <h2>trending services</h2>
      <ServicesList services={trendingServices}/>
      <h2>new incoming orders</h2>
      <OrdersList orders={[...incomingOrders.new]}/>
      <h2>updates on your outgoing orders</h2>
      <OrdersList orders={[...outgoingOrders.fulfilled]}/>
    </PageContainer>
  );
}

export default Home