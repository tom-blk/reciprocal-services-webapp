import SearchBar from "../../components/search-bar/search-bar.component";
import ServiceCard from "../../components/service-card/service-card.component";
import { services } from "../../datamodels/services/services-examples";

const Home = () => {
    return (
      <div className="home">
        <h1 className="home-heading">Reciprocal Services</h1>
        <SearchBar />
        {
          services.map((service) => {
            return(
              <ServiceCard key={service.id} title={service.name} description={service.description}/>
            )
          })
        }
      </div>
    );
  }

export default Home