import { useState } from "react";
import NavTile from "./NavTile"

function Navigation(){
    
    const [currentDate, setDate] = useState(new Date());
    let d = [];
    for(let i=0; i<6; i++){
        let day = String(currentDate.getDate()).padStart(2, '0');  
        let month = String(currentDate.getMonth() + 1).padStart(2, '0');  
        let year = currentDate.getFullYear();
        let date = `${year}-${month}=${day}`;
        date = new Date(date);
        date = new Date(date.setDate(date.getDate()+i));
        d.push(date)
    }

    return(
        <nav className="page-nav">
            {
                d.map((item,index)=>{
                    return <NavTile date={item} key={index}/>
                })
            }
            <a class="page-nav__day page-nav__day_next" href="#" onClick={(e)=>{
                e.preventDefault();
                let newDate = currentDate;
                newDate = new Date(newDate.setDate(newDate.getDate()+1));
                setDate(newDate)
            }}>
            </a>
        </nav>
        
    )
}

export default Navigation;