import SeatBuying from "./SeatBuying";

function RowBuying({row}){
    return(
        <div className="buying-scheme__row">
            {
                row.map((item,index)=>{
                    return <SeatBuying type={item} key={index}/>
                })
            }
        </div>
    )
}

export default RowBuying;