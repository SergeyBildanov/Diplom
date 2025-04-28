/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


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
    let hallNumber = document.querySelector(".conf-step__selectors-box").childElementCount + 1;
    console.log(hallNumber);
    let addForm = document.querySelector(".add-form");
    addForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/halls");
        
        var meta = document.getElementsByTagName('meta'); 
        for (let i=0; i<meta.length; i++) { 
            if (meta[i].getAttribute("name") == "csrf-token") {  
                xhr.setRequestHeader("X-CSRF-Token", meta[i].getAttribute("content"));
            } 
        }
        let data = {
            "number": JSON.stringify(hallNumber),
            "seats": JSON.stringify([])
        }
        let formData = new FormData();

        for (let key in data){
            formData.append(key, data[key])
        }
        
        xhr.send(formData);
    })
}


