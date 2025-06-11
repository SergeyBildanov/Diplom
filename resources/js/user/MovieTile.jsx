import MovieInfo from "./MovieInfo";
import Seances from "./Seances";


function MovieTile({movie, seances}){
    return(
        <section class="movie">
            <MovieInfo name={movie.name} info={movie.info} poster={`images/admin/${movie.poster}`} length={movie.length} origin={movie.origin}/>  
            
            {
                seances.map((item, index)=>{
                    return(
                        <Seances hall={item.hall} seances={item.times} key={index}/>
                    )
                })
            }     
        </section>
    )
}

export default MovieTile;