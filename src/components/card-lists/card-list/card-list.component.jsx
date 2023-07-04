import './card-list.styles.scss';

const CardList = ({ list, OutputCard, expectedPropByOutputCardString, emptyListWarning}) => {

    return(
        <div className="card-list">
            {
                Array.isArray(list) &&
                list.length > 0
                ?
                list.map((listItem) => {
                    return(
                            <OutputCard key={listItem.id} item={listItem}/>
                        ) 
                    } 
                )
                :
                <div className="text">{emptyListWarning}</div>
            }
        </div>
    )
}

export default CardList