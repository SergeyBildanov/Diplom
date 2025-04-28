import Ticket from "./Ticket";

function TicketPage(){
    let movie = 'Звёздные войны XXIII: Атака клонированных клонов';
    let seats = [6,7];
    let hall = 1;
    let start = "18:30";
    return(
        <>
            <Ticket movie={movie} seats={seats} hall={hall} start={start}/>
        </>
    )
}

export default TicketPage;