/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';
import '../js/components/admin_index';
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
function objectToFormData(obj) {
    const formData = new FormData();
  
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    return formData;
  }

export function sendRequest(url,method, data, callback) {
    let xhr = new XMLHttpRequest();
    let token = document.getElementsByTagName('meta')['csrf-token'].content;
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState===xhr.DONE && xhr.status==200){
            callback(xhr);
        }
    })
    if(method === "POST"){
        xhr.open(method, url);
        xhr.setRequestHeader('X-CSRF-Token', token);
        if(data instanceof FormData){
            xhr.send(data);
        }
        else{
            let formData = data?objectToFormData(data):null;
            xhr.send(formData);
        }
        
    }
    else{
        let str = data?"?"+Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&'):"";
        xhr.open(method, url+str);
        xhr.setRequestHeader('X-CSRF-Token', token);
        xhr.send();
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    if (window.ыcriptInitialized) return;
    window.ыcriptInitialized = true;
    if(document.querySelector(".admin-index")){
        const headers = Array.from(document.querySelectorAll('.conf-step__header'));
        headers.forEach(header => header.addEventListener('click', () => {
            header.classList.toggle('conf-step__header_closed');
            header.classList.toggle('conf-step__header_opened');
        }));
        if(!document.querySelector(".conf-step__selectors-box").firstElementChild){
            document.querySelector(".config-wrapper").classList.add("hidden");
            document.querySelector(".prices-wrapper").classList.add("hidden");
        }
        const deletes = Array.from(document.querySelectorAll(".delete-hall"));
    
        deletes.forEach(deleteItem => deleteItem.addEventListener('click', (e)=>{
            e.preventDefault();
            let url = (deleteItem.href);
            sendRequest(url, "DELETE", null, ()=>{
                window.location.reload();
            })
        }));
        const radios = Array.from(document.querySelectorAll(".conf-seats"));
        radios.forEach(radio=>radio.addEventListener("change", (e)=>{
                 
            let hall = e.target.dataset.id;
            sendRequest(`/hall/${hall}`, "GET", null, (xhr)=>{
                let state = JSON.parse(JSON.parse(xhr.responseText).element.seats)
                window.HallConfig.setStateSeats(state);
            })
        }))
        const config = document.querySelector(".config-hall");
        config.addEventListener("click", (e)=>{
            e.preventDefault();
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
            let number = Array.from(document.querySelectorAll(".conf-step__radio"));
            number = number.filter(item=>item.checked)
            number = number[0].dataset.id;
            sendRequest(`/hall/update/${number}`, "PATCH", {"seats": JSON.stringify(hall)}, ()=>{
                let message = document.querySelector(".config-hall_confirm");
                message.classList.toggle("hidden");
                setTimeout(()=>{
                    message.classList.toggle("hidden");
                },1000)
            })
        })
    
        const confCosts = Array.from(document.querySelectorAll(".conf-costs"));
        confCosts.forEach(button=>button.addEventListener("change", (e)=>{
            let hall = e.target.dataset.id;
            sendRequest(`/hall/${hall}`, "GET", null, (xhr)=>{
                let standartCost = document.querySelector(".standart-cost");
                let vipCost = document.querySelector(".vip-cost");
                standartCost.value = JSON.parse(xhr.response).element.standartCosts;
                vipCost.value = JSON.parse(xhr.response).element.vipCosts;
            })
        }))
    
        const configCost = document.querySelector(".confirm-costs");
        configCost.addEventListener("click", ()=>{
            let number = Array.from(document.querySelectorAll(".conf-step__radio"));
            number = number.filter(item=>item.checked)
            number = number[0].dataset.id;
            let data = {
                "standartCosts": parseInt(document.querySelector(".standart-cost").value),
                "vipCosts": parseInt(document.querySelector(".vip-cost").value),
            };
            sendRequest(`/hall/update/${number}`, "PUT", data, (xhr)=>{
                let message = document.querySelector(".config-hall_confirm");
                message.classList.toggle("hidden");
                setTimeout(()=>{
                    message.classList.toggle("hidden");
                },1000)
            })
        })
    
        const resetHall = document.querySelector(".reset-hall");
        resetHall.addEventListener("click", ()=>{
            window.HallConfig.setStateSeats([]);
        })
    
        const addFilmButton = document.querySelector(".add-film-button");
        const addFilmPopup = document.querySelector(".add-film-popup");
        addFilmButton.addEventListener("click", ()=>{
            addFilmPopup.classList.add("active");
        })
        
        const addSeanceForm = document.querySelector(".add-seance")

        addSeanceForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let formData = new FormData(e.target);
            formData.append("hall", e.target.closest(".popup").dataset.id);
            sendRequest("/seance/create", "POST", formData, ()=>{});
        })
        document.querySelector(".add-seance-popup .popup__content").addEventListener("click", (e)=>{
            if(e.target.closest(".popup__dismiss")){
                let popup = e.target.closest(".popup");
                popup.classList.remove("active");
            }
        })

        const resetSeances = document.querySelector(".reset-seances");
        resetSeances.addEventListener("click", ()=>{
            sendRequest("/seance/delete", "DELETE", null, ()=>{
                window.location.reload();
            })
        })

        const saveSeances = document.querySelector(".save-seances");
        saveSeances.addEventListener("click", ()=>{
            let message = document.querySelector(".config-hall_confirm");
            message.classList.toggle("hidden");
            setTimeout(()=>{
                message.classList.toggle("hidden");
            },1000)
        })

        const activations = Array.from(document.querySelectorAll(".conf-activate"));
        activations.forEach(item=>item.addEventListener("change", (e)=>{
            if(document.querySelector(".conf-activate.chosen")){
                document.querySelector(".conf-activate.chosen").classList.remove("chosen");
            }
            e.target.classList.add("chosen");
            if((parseInt(e.target.dataset.active) === 1)){
                document.querySelector(".selling-button").textContent = "Приостановить продажу билетов"
            }
            else{
                document.querySelector(".selling-button").textContent = "Открыть продажу билетов"
            }
        }))
        const sellingButton = document.querySelector(".selling-button");
        sellingButton.addEventListener("click", ()=>{
            let id = document.querySelector(".conf-activate.chosen").dataset.id;
            let isActive = parseInt(document.querySelector(".conf-activate.chosen").dataset.active); 
            sendRequest(`/hall/patch/${id}`, "PATCH", {"isActive":isActive}, ()=>{
                window.location.reload();
            })
        })
        
    }
    if(document.querySelector(".buying")){
        const buyingScheme = document.querySelector(".buying-scheme__wrapper");
        buyingScheme.addEventListener("click", (e)=>{
            if(e.target.classList.contains("buying-scheme__chair") ){
                if(e.target.classList.contains("buying-scheme__chair_disabled") || e.target.classList.contains("buying-scheme__chair_taken")){
                    return;
                }
                e.target.classList.toggle("buying-scheme__chair_selected");
            }
        })
        const acceptButton = document.querySelector(".acceptin-button");
        acceptButton.addEventListener("click", (e)=>{
            let seats = Array.from(document.querySelector(".buying-scheme__wrapper").querySelectorAll(".buying-scheme__chair_selected"));
            if(!seats){
                return;
            }
            seats = seats.map(item => {
                let type = item.classList[1].split("_")[3];
                let cost = parseInt(document.querySelector(`.buying-scheme__chair_${type} + .buying-scheme__legend-value`).textContent);
                let row = item.closest(".buying-scheme__row").dataset.id;
                let seat = item.dataset.id;
                return {
                    type,
                    cost,
                    "seat": `Ряд ${row}, Место: ${seat}`,
                };
            });
            let movie = document.querySelector(".buying__info-title").textContent;
            let hall = parseInt(document.querySelector(".buying__info-hall").textContent.split(" ")[1]);
            let start = document.querySelector(".buying__info-start").textContent.split(" ")[2];
            let hall_id = document.querySelector(".buying-scheme").dataset.id;
            let data = {
                movie,
                hall,
                start,
                hall_id,
                "seats": JSON.stringify(seats)
            };

            window.location.replace(`/payment${"?"+Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&')}`);            
        })
    }
    if(document.querySelector(".ticket")){
        const acceptButton = document.querySelector(".acceptin-button");
        acceptButton.addEventListener("click", ()=>{
            let movie = document.querySelector(".ticket__title").textContent;
            let hall =  parseInt(document.querySelector(".ticket__hall").textContent);
            let start = document.querySelector(".ticket__start").textContent;
            let seats = document.querySelector(".ticket__chairs").textContent;
            let data = {
                movie,
                hall,
                start,
                seats
            }
            let id = document.querySelector(".id").dataset.id;
            sendRequest(`/hall/${id}`, "GET", null, (xhr)=>{
                let indexes = seats.split(";").map(item => {
                    let arr = item.split(" ");
                    return [parseInt(arr[1]), parseInt(arr[3])];
                });
                let currentSeats = JSON.parse(JSON.parse(xhr.response).element.seats)
                indexes.forEach(item => {
                    currentSeats[item[0]-1][[item[1]-1]] = "taken";
                })
                sendRequest(`/hall/update/${id}`, "PATCH", {seats: JSON.stringify(currentSeats)}, ()=>{
                    window.location.replace(`/ticket${"?"+Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&')}`);  
                })
            })
            
        })

    }
})




