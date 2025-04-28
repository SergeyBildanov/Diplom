function Seances({hall, seances}){
    return(
        <div class="movie-seances__hall">
            <h3 class="movie-seances__hall-title">Зал {hall}</h3>
            <ul class="movie-seances__list">
                {
                    seances.map((item, index)=>{
                        return(
                            <li class="movie-seances__time-block" key={index}><a class="movie-seances__time" href="hall.html">{item}</a></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Seances;