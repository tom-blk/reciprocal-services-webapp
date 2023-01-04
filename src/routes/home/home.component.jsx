import TrendingServicesList from "../../components/trending-services-list/trending-services-list.component";
import TransactionsList from "../../components/transactions-list/transactions-list.component";
import PageContainer from "../../utils/page-container/page-container.component";

const Home = () => {

  return (
    <PageContainer>
      <div className="heading-primary">home</div>
      <div className="heading-secondary">trending services</div>
      <TrendingServicesList/>
      <div className="heading-secondary">pending transactions</div>
      <TransactionsList completed={false}/>
    </PageContainer>
  );
}

export default Home