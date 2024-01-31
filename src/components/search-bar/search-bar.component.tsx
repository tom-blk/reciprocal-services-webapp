import React from "react";
import "./search-bar.styles.scss"

interface Props{
    className: string;
    onSearchChange: (searchString: string) => void;
    placeholder: string;
}

const SearchBar = ({className, onSearchChange, placeholder }: Props) => {

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