import { useNavigate } from "react-router-dom";
import TrendingServicesList from "../../components/trending-services-list/trending-services-list.component";
import TransactionsList from "../../components/transactions-list/transactions-list.component";
import PageContainer from "../../utils/page-container/page-container.component";

const Home = () => {

  return (
    <PageContainer>
      <h1 className="home-heading">Home</h1>
      <h2>Trending Services: </h2>
      <TrendingServicesList/>
      <h2>Pending Transactions: </h2>
      <TransactionsList completed={false}/>
    </PageContainer>
  );
}

export default Home