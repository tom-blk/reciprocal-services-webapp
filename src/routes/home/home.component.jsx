import SearchBar from "../../components/search-bar/search-bar.component";
import ServiceCard from "../../components/service-card/service-card.component";
import TrendingServicesList from "../../components/trending-services-list/trending-services-list.component";
import { services } from "../../datamodels/services/services-examples";

const Home = () => {
    return (
      <div className="home">
        <h1 className="home-heading">Home</h1>
        <TrendingServicesList/>
      </div>
    );
  }

export default Home