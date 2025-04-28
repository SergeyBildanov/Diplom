function Seat({type}){
    return (
        <>
            <span className={`conf-step__chair conf-step__chair_${type}`}></span>
        </>
    )
  }

export default Seat;