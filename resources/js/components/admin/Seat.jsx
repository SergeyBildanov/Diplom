function onClickHandler(elem){
    // const types = ["standart", "vip", "disabled"];
    // let currentClass = elem.classList[1];
    // let type = currentClass.split("_")[3]
    // elem.classList.remove(currentClass);
    // elem.classList.add(`conf-step__chair_${types[(types.indexOf(type)+1)%3]}`)
    console.log(elem);
}

function Seat({type}){
    return (
        <>
            <span className={`conf-step__chair conf-step__chair_${type}`} onClick={(e)=>{
                const types = ["standart", "vip", "disabled"];
                let currentClass = e.target.classList[1];
                let type = currentClass.split("_")[3]
                e.target.classList.remove(currentClass);
                e.target.classList.add(`conf-step__chair_${types[(types.indexOf(type)+1)%3]}`);
                let rowInput = document.querySelector(".input-seats");
                let rowLength = parseInt(rowInput.value?rowInput.value:rowInput.placeholder);
                let seats = Array.from(document.querySelectorAll(".conf-step__hall .conf-step__chair"));
                seats = seats.map(item => item.classList[1].split("_")[3])
                let hall = [];
                let row = [];
                for(let i=0; i<seats.length; i++){
                    row.push(seats[i]);
                    if(row.length===rowLength){
                        hall.push(row);
                        row = []
                    }
                }
                window.HallConfig.setStateSeats(hall);
            }}></span>
        </>
    )
  }

export default Seat;