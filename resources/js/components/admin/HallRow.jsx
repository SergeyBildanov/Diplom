import Seat from "./Seat";

function HallRow({items}){

    return(
        <div className="conf-step__row">
              {
                items.map((item, index)=>{
                    return <Seat type={item} key={index}/>
                })
              }
        </div> 
    )
}

export default HallRow;