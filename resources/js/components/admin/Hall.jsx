import HallRow from "./HallRow";
function Hall({n,m}){
    let list = [];
  
    for(let i=0; i<n; i++){
        let newList = []; 
        for(let j=0; j<m; j++){
            newList.push("standart");
        }
        list.push(newList);
    }
  
    return(
        <div className="conf-step__hall-wrapper">
            {
              list.map((item, index)=>{
                return(
                  <HallRow items={item} key={index}/>
                )
              })
            }
        </div>
    )
  }

  export default Hall;