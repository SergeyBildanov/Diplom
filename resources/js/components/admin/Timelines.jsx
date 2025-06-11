import { sendRequest } from "../../app";
import Timeline from "./Timeline"
import { useEffect, useState } from "react";

function Timelines(){
    const [halls, setHalls] = useState([]);
    
    
    useEffect((
        
    )=>{
        let data = {isActive:0};
        let url = "/halls";
        let xhr = new XMLHttpRequest();
        let token = document.getElementsByTagName('meta')['csrf-token'].content;
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState===xhr.DONE && xhr.status==200){
                setHalls(JSON.parse(xhr.response));
            }1
        })
            
        let str = data?"?"+Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&'):"";
        xhr.open("GET", url+str);
        xhr.setRequestHeader('X-CSRF-Token', token);
        xhr.send();
    }, [])

    return(
        <>
            {
                halls.map(item=>{
                    return <Timeline hall={item}/>
                })
            }
        </>
    )
}

export default Timelines;