import qrcode from "../../css/i/user/qr-code.png"
function Ticket({movie, seats, hall, start}){
    let seatString = seats.reduce((acc, item, index)=>{
        if(index==0){
            acc += item;
        }
        else{
            acc += item + ', ';
        }
        return acc;
    }, '')
    return(
        <>
            <header className="tichet__check">
                <h2 className="ticket__check-title">Электронный билет</h2>
            </header>
      
            <div className="ticket__info-wrapper">
                <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie}</span></p>
                <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{seatString}</span></p>
                <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall}</span></p>
                <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{start}</span></p>

                <img className="ticket__info-qr" src={qrcode}/>

                <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
                <p className="ticket__hint">Приятного просмотра!</p>
            </div>
        </>
    )
}

export default Ticket;