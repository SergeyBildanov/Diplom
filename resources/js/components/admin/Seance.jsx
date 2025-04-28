function Seance({movie, start}){
    let a = start.split(":").map((item)=>{return parseInt(item)});
    let time = (a[0] + a[1]/60).toFixed(2);
    return(
      <div className="conf-step__seances-movie" style={{width: 60 + 'px', backgroundColor: 'rgb(133, 255, 137)', left: time*30 + 'px'}}>
        <p className="conf-step__seances-movie-title">{movie}</p>
        <p className="conf-step__seances-movie-start">{start}</p>
    </div>
    )
  }
  export default Seance;