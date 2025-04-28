import Payment from "./Payment";

function PaymentPage(){
    let movie = 'Звёздные войны XXIII: Атака клонированных клонов';
    let seats = [6,7];
    let hall = 1;
    let start = "18:30";
    let cost = 600;

    return(
        <>
            <Payment movie={movie} seats={seats} hall={hall} start={start} cost={cost}/>
        </>
    )
}

export default PaymentPage;