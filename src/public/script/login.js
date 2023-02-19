const formLogin = document.getElementById('formLogin');
const divAlert = document.getElementById('divAlert');
const collapseExample = document.getElementById('collapseLogin');
const iconUser = document.getElementById('iconUser');
const iconLogin = document.getElementById('iconLogin');
//! Falta arreglar la foto del user, hay que ocultar el iconlogin y poner de bajo de la foto el nombre del usuario :D
const menssage = (text, icon) =>{
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        title:  text,
        icon: icon
    })
}
const userConfig = (user)=>{
    collapseExample.removeAttribute('class')
    collapseExample.classList.add('designCollapse')
    collapseExample.classList.add('collapse')
    console.log(user)
    iconLogin.classList.add('d-none'); 
    iconUser.innerHTML = 
    `
        <img src='${user.avatar}' width='40'>
        <p class='text-center m-1'>${user.firstName}
    `
}
formLogin.addEventListener('submit', async(event) =>{
    event.preventDefault();
    let data = new FormData(formLogin);
    let obj = {}

    data.forEach((value, key) => obj[key] = value);
    await fetch("/api/user/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj) //Mandamos al objeto directamente
    })
    .then(result => result.json()).then(json => {
        if(json.status === 'error'){
            divAlert.innerHTML = 
            `<div class="alert alert-danger text-center w-100 p-1" role="alert">
                ${json.error}
            </div>`
        }       
        else{ 
            menssage(json.proload, json.status)
            divAlert.innerHTML = ``;
            userConfig(json.payload);
        }
        console.log(json)
    })
})