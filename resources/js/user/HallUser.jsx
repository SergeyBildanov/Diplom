import RowBuying from "./RowBuying"

function HallUser({rows}){
    return(
        <div className="buying-scheme__wrapper">
            {
                rows.map((item, index)=>{
                    return <RowBuying row={item} key={index}/>
                })
            }
        </div>
    )    
}

export default HallUser;