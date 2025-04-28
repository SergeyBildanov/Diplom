function Payment({movie, seats, hall, start, cost}){
    let seatString = seats.reduce((acc,item,index)=>{
        if(index==0){
            acc+=item;
        }
        else{
            acc+=', '+item;
        }
        return acc;
    }, '');
    return(
        <section classNameName="ticket">
            <header className="tichet__check">
                <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
            </header>
      
            <div className="ticket__info-wrapper">
                <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie}</span></p>
                <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{seatString}</span></p>
                <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall}</span></p>
                <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{start}</span></p>
                <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{cost}</span> рублей</p>

                <button className="acceptin-button" onclick="location.href='ticket.html'" >Получить код бронирования</button>

                <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
                <p className="ticket__hint">Приятного просмотра!</p>
            </div>
        </section>
    )
}

export default Payment;