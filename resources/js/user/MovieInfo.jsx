function MovieInfo({name, info, poster, length, origin}){
    return(
        <div class="movie__info">
            <div class="movie__poster">
            <img class="movie__poster-image" alt={`${name} постер`} src={poster}/>
            </div>
            <div class="movie__description">
            <h2 class="movie__title">{name}</h2>
            <p class="movie__synopsis">{info}</p>
            <p class="movie__data">
                <span class="movie__data-duration">{length} минут</span>
                <span class="movie__data-origin">{origin}</span>
            </p>
            </div>
        </div>
    )
}

export default MovieInfo;