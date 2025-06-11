import { sendRequest } from "../app";
//import Movies from "./Movies";

function NavTile({date}){
    let today = new Date();
    let weekday = date.toLocaleString('Russian', {weekday:'short'});
    weekday = weekday[0].toUpperCase() + weekday.substr(1);
    let isToday = today.toDateString()===date.toDateString();
    let weekends = [6,0];
    let isWeekend = weekends.includes(date.getDay())
    
    const clickHandler = (e)=>{
        e.preventDefault();
        let currentActive = document.querySelector(".page-nav__day_chosen");
        if(currentActive){
            currentActive.classList.remove("page-nav__day_chosen");
        }
        e.currentTarget.classList.add("page-nav__day_chosen");
        sendRequest("/seances", "GET", { "day": e.currentTarget.dataset.date, "isActive":1}, (xhr)=>{
            let response = JSON.parse(xhr.response).seances;
            let result = {};
            response.forEach(element => {
                if(!result[element.movie]){
                    result[element.movie] = {}
                    result[element.movie]["seances"] = {};
                    result[element.movie]["fullMovie"] = element.full_movie;
                }
                if(!result[element.movie]["seances"][element.hall]){
                    result[element.movie]["seances"][element.hall] = [];
                }
                
                result[element.movie]["seances"][element.hall].push({
                    "id": element.id,
                    "time":element.start,
                });
            
            });
            result = {"seances":Object.values(result)};
            for(let item of result["seances"]){
                let seances = [];
                Object.entries(item.seances).forEach(([key, value])=>{
                    seances.push({
                        "hall": key,
                        "times": value
                    })
                })
                item.seances = seances;
            }
            window.Movies.setSeances(result);
        })
    }

    let day = String(date.getDate()).padStart(2, '0');  
    let month = String(date.getMonth() + 1).padStart(2, '0');  
    let year = date.getFullYear();

    return(
        <a className={`page-nav__day ${(isToday)?"page-nav__day_today":isWeekend?"page-nav__day_weekend":""}`} href="#" data-date={`${year}-${month}-${day}`} onClick={clickHandler}>
            <span className="page-nav__day-week">{weekday}</span><span className="page-nav__day-number">{date.getDate()}</span>
        </a>
    )
  }

export default NavTile;