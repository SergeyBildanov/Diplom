import Seance from "./Seance"
import { useEffect, useState } from "react";
import {sendRequest} from "../../app"

function objectToFormData(obj) {
    const formData = new FormData();
  
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    return formData;
}

function Timeline({hall}){
    let today = new Date();  
    let day = String(today.getDate()).padStart(2, '0');  
    let month = String(today.getMonth() + 1).padStart(2, '0');  
    let year = today.getFullYear();  
    let currentDate = `${year}-${month}-${day}`;
    const [myState, setMyState] = useState({
        currentDay:currentDate,
        currentMovies:[]
    });
    
    const clickHandler = (e)=>{
        if(e.target.className.includes("conf-step__seances-movie")){
            let target = e.target.classList.contains("conf-step__seances-movie")?e.target:e.target.closest(".conf-step__seances-movie");
            let id = target.dataset.id;
            sendRequest(`/seance/delete/${id}`, "DELETE", null, ()=>{
                window.location.reload();
            })
            return;
        }
        let hall = e.target.dataset.id;
        let form = document.querySelector(".add-seance-popup");
        form.dataset.id = hall;
        form.classList.add("active");
        
    };

    const incrementHandler = event =>{
        let date = new Date(myState.currentDay);
        let newDay = new Date(date.setDate(date.getDate() + 1));
        let day = String(newDay.getDate()).padStart(2, '0');  
        let month = String(newDay.getMonth() + 1).padStart(2, '0');  
        let year = newDay.getFullYear();  
        let currentDate = `${year}-${month}-${day}`;
        sendRequest(`/seance/${hall["number"]}`, "GET", {"day": currentDate}, (xhr)=>{
            setMyState({
                "currentDay": currentDate,
                "currentMovies": JSON.parse(xhr.response).seances
           })
        })
    }

    const decrementHandler = event =>{
        let date = new Date(myState.currentDay);
        let newDay = new Date(date.setDate(date.getDate() - 1))
        let day = String(newDay.getDate()).padStart(2, '0');  
        let month = String(newDay.getMonth() + 1).padStart(2, '0');  
        let year = newDay.getFullYear();  
        let currentDate = `${year}-${month}-${day}`;
        sendRequest(`/seance/${hall["number"]}`, "GET", {"day": currentDate}, (xhr)=>{
            setMyState({
                "currentDay": currentDate,
                "currentMovies": JSON.parse(xhr.response).seances
           })
        })
    }
    return(
        <div className="timeline-container">
        <div className="change-wrapper">
            <div class="change-day " onClick={decrementHandler}> {"<<"} </div>
            <div className="seance-day ">{myState.currentDay}</div>
            <div class="change-day " value=">>" onClick={incrementHandler}> {">>"} </div>
        </div>
        <div className="conf-step__seances-hall">
            <h3 className="conf-step__seances-title">Зал {hall["number"]}</h3>
            <div className="conf-step__seances-timeline" data-id={hall["number"]} onClick={clickHandler}>
                {
                    myState.currentMovies.map((item, index)=>{
                        return(
                            <Seance movie={item.movie} start={item.start} key={index} id={item.id}/>
                        )
                    })
                }
            </div>
        </div>
        </div>
    )
}

export default Timeline;