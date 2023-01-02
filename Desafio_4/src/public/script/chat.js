const socket = io({
    autoConnect:false, //no se conecta al servidor hasta que se lo indiquemos
});
const send = document.getElementById('send'); //el boton de enviar
const msg = document.getElementById('msg'); //Div que se encuentra en el modal-body
const chatBox = document.getElementById('chatBox')
const listProduct = document.getElementById('listProduct');
let user;

Swal.fire({
    title: 'Identificate', //titulo del alert
    input: 'text', //Indicamos el control que queremos usar
    inputValidator: (value) =>{
        /*******************
         * Valida lo que se ingreso en el input
         * ? si value(guarda lo que se ingreso) no tiene nada, le mandamos el mensaje
         *******************/
        return !value && 'Necesito que ingrese un nombre para seguir!';
    },
    allowOutsideClick: false, //si hace click el alert no se va
}).then(result =>{
    user = result.value; //guardamos el dato en una variable
    socket.connect(); //nos conectamos al socket
    socket.emit('authenticated', user);
    console.log(user);
    fetch("/api/products/allProduct")
    .then(result => result.json())
    .then(json =>{
        json.forEach(element => {
            listProduct.innerHTML += 
            `
            <div class="row d-flex justify-content-center align-items-center shade rounded w-100 m-2">
                <div class="p-3 d-flex w-100">
                    <div class="col">
                        <p>${element.name}</p>
                    </div>
                    <div class="col">
                        <p class="m-0">$ ${element.price}</p>
                    </div>
                    <div class="col">
                        <img src= ${element.images} alt="imagen producto" width="80" height='80'>
                    </div>
                </div>
            </div>
            `
        });
    });
})

chatBox.addEventListener(('keyup' || 'submit'), evt =>{
    if(evt.key === 'Enter' || evt.keyCode ===13){
        if(chatBox.value.trim().length>0){ //eliminamos los espacios del mensaje
            //Emite un evento del socket | por cada emit tiene que haber un on que lo escuche
            socket.emit('message', {user, message: chatBox.value.trim()});
            chatBox.value = ''; 
        }
    }
})

//? Mostrar datos 
const form = document.getElementById("productForm");

form.addEventListener('submit', e =>{
    e.preventDefault(); //evita que al enviar los datos se resfresque la pagina 
    let data = new FormData(form); //Obtenemos los datos que ingresaron en el formulario | estrucuta de datos diferente
    let obj = {}; //creamos un objeto
    /* Los que hacemos con forEach es agarrar la estrutura del forData y lo arma en un objeto*/
    data.forEach((value, key) => obj[key] = value); 
    //Modificamos el fetch ya que no podemos subir imagenes como json
    fetch("/api/products",{
        method:"POST",
        body:data //Mandamos al objeto directamente
    })
    .then(result => result.json())
    .then(result => socket.emit('newProduct', result))
        // const {name, price, images} = result;
        // listProduct.innerHTML += 
        //     `
        //     <div class="row d-flex justify-content-center align-items-center shade rounded w-100 m-2">
        //         <div class="p-3 d-flex w-100">
        //             <div class="col">
        //                 <p>${name}</p>
        //             </div>
        //             <div class="col">
        //                 <p class="m-0">$ ${price}</p>
        //             </div>
        //             <div class="col">
        //                 <img src= ${images} alt="imagen producto" width="80" height='80'>
        //             </div>
        //         </div>
        //     </div>
        //     `
    


    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        title: 'Su producto se guardo correctamente',
        icon: 'success'
    })
    // fetch("/api/products/allProduct",{
    //     timeout: 6000,
    //     headers:{ //Nos sirve para que el servidor sepa que tipo de datos le mandamos
    //         "Content-Type" : "application/json"
    //     }
    // })
    // .then(result => result.json())
    // .then(result => console.log(result))
})

//Todo: Socket listeners
//Creamos este socket.on para que escuche el emit del servidor
socket.on('logs', data =>{
    let message = '';
    data.forEach(msgs => {
        msgs.user !== user 
        ? message += 
        `
            <div class='userMessage'>
                <p>${msgs.user}</p>
                <p class='designMessage'>${msgs.message}</p> 
                <br/>
            </div>
        `
        : message += 
        `
            <div class='messageRight'>
                <div>
                    <p>${msgs.user}</p>
                    <p class='designMessage color'>${msgs.message}</p> 
                    <br/>
                </div>
            </div>
        `
    });    
    msg.innerHTML = message;
})
socket.on('addProduct', data =>{
    const {name, price, images} = data;
        listProduct.innerHTML += 
            `
            <div class="row d-flex justify-content-center align-items-center shade rounded w-100 m-2">
                <div class="p-3 d-flex w-100">
                    <div class="col">
                        <p>${name}</p>
                    </div>
                    <div class="col">
                        <p class="m-0">$ ${price}</p>
                    </div>
                    <div class="col">
                        <img src= ${images} alt="imagen producto" width="80" height='80'>
                    </div>
                </div>
            </div>
            `
})
socket.on('newUserConnected', data =>{
    if(!user) return;
    msg.innerHTML += `<p class='logIn'>${data} se ha unido al chat</p>`
})