import { useEffect, useState } from "react"

const SearchBar = (props) => {

    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        search();
    }, [searchString])

    const search = () => {
        const searchResults = props.services.filter(filterServices)
        console.log(searchResults);
    }

    const filterServices = (service) => {
        return searchString.localeCompare(service.name.toLocaleLowerCase());
    }

    return(
        <input 
            onChange={e => setSearchString(e.target.value.toLocaleLowerCase())} 
            type={"search"} 
            placeholder="Search For Services..."
        />
    )
}

export default SearchBar;