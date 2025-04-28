import Seance from "./Seance"

function Timeline({movies}){
    return(
        <div className="conf-step__seances-timeline">
            {
                movies.map((item, index)=>{
                    return(
                        <Seance movie={item.name} start={item.start} key={index}/>
                    )
                })
            }
        </div>
    )
}

export default Timeline;