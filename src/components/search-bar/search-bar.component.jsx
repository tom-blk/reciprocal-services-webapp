import "./search-bar.styles.scss"

const SearchBar = ({className, onSearchChange, placeholder }) => {

    return(
        <input 
            className={`search-bar ${className}`}
            onChange={e => onSearchChange(e.target.value.toLocaleLowerCase())} 
            type={"search"} 
            placeholder={`Search For ${placeholder}...`}
        />
    )
}

export default SearchBar;