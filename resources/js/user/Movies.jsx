import MovieTile from "./MovieTile"

function Movies({seances}){
    return(
       <main>
            {
                seances.map((item, index)=>{
                    return <MovieTile movie={item.movie} seances={item.seances} key={index}/>
                })
            }
       </main>
    )
}

export default Movies;