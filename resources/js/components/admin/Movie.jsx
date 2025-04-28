import poster from "../../../css/i/admin/poster.png"
function Movie({name, minutes}){
    return(
      <div className="conf-step__movie">
        <img className="conf-step__movie-poster" alt="poster" src={poster} />
        <h3 className="conf-step__movie-title">{name}</h3>
        <p className="conf-step__movie-duration">{`${minutes} минут`}</p>
      </div>
    )
  }

export default Movie;