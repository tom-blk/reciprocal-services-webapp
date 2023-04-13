import "./search-bar.styles.scss"

const SearchBar = ({className, onSearchChange, placeholder }) => {

    return(
        <input 
            className={`text-area search-bar ${className}`}
            onChange={e => onSearchChange(e.target.value.toLocaleLowerCase())} 
            type={"search"} 
            placeholder={`Search For ${placeholder}...`}
        />
    )
}

export default SearchBar;