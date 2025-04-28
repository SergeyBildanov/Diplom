import Movie from "./Movie";
function MovieList({movies}){
    return(
      <div className="conf-step__movies">
        {
          movies.map((movie, index)=>{
            return(
              <Movie name={movie.name} minutes={movie.minutes} key={index}/>
            )
          })
        }
      </div>
    )
  }

  export default MovieList;