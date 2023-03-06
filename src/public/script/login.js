const formLogin = document.getElementById('formLogin');
const divAlert = document.getElementById('divAlert');
const collapseExample = document.getElementById('collapseLogin');
const iconUser = document.getElementById('iconUser');
const iconLogin = document.getElementById('iconLogin');

//! Configuracion para ocultar el collapse
const userConfig = (user)=>{
    collapseExample.removeAttribute('class')
    collapseExample.classList.add('designCollapse')
    collapseExample.classList.add('collapse')
    iconLogin.classList.add('d-none'); 
    iconUser.innerHTML = 
    `
        <img class='d-flex justify-content-center align-items-center p-0 m-auto'src='${user.avatar}' width='40'>
        <p class='text-center m-1'>${user.name}
    `
}

//! funcionalidad para loguearse
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
        //Mensaje parea el usaurio en caso de que tenga un error 
        if(json.status === 'error'){
            divAlert.innerHTML = 
            `<div class="alert alert-danger text-center w-100 p-1" role="alert">
                ${json.error}
            </div>`
        }       
        else{ 
            //recarga para la visualizacion del usuario 
            divAlert.innerHTML = ``;
            userConfig(json.payload);
            location.href = '/tienda'
        }
    })
})