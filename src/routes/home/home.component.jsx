import TrendingServicesList from "../../components/trending-services-list/trending-services-list.component";

const Home = () => {
    return (
      <div className="home">
        <h1 className="home-heading">Home</h1>
        <h2>Trending Services: </h2>
        <TrendingServicesList/>
        <h2>Pending Transactions: </h2>
      </div>
    );
  }

export default Home