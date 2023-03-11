const socket = io({
    autoConnect: false, //no se conecta al servidor hasta que se lo indiquemos
});
const send = document.getElementById('send'); //el boton de enviar
const msg = document.getElementById('msg'); //Div que se encuentra en el modal-body
const chatBox = document.getElementById('chatBox')
const listProduct = document.getElementById('listProducts');
const btnCarrito = document.getElementById('btnCarrito');
const inputForm= document.getElementById('inputForm');
const btnModify = document.getElementById('btnModify')
const formModify = document.getElementById('formModify')
const dataModification = document.getElementById('dataModification');

let estado = true;
let user = [];

//? una vez que se completaron los datos nos conetamos con el socket
socket.connect(); //nos conectamos al socket
mostrarProducto();

const deleteProduct = async (event) => {
    await fetch(`/api/products/${event.target.id}`, {
        method: 'DELETE'
    })
    await socket.emit('newProduct');
}
async function mostrarProducto() {
    await fetch("/api/products/product")
        .then(result => result.json())
        .then(json => {
            listProduct.innerHTML = ''
            json.forEach(element => {
                listProduct.innerHTML +=
                    `
            <div class="row d-flex justify-content-center align-items-center w-100 m-2">
                <div class="p-3 d-flex w-100 shade rounded">
                    <div class="col d-flex justify-content-center align-items-center">
                        <p class="m-0 text-center">${element.name}</p>
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        <p class="m-0 text-center">$ ${element.price}</p>
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        <p class="m-0 text-center">${element.stock}</p>
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        <img src= ${element.image} alt="imagen producto" width="80" height='80'>
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        <button class='btn btn-danger listBtnEliminar' id='${element.code}'>Eliminar</button>
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        <button type="button" id='${element.code}' class='btn btn-warning listBtnModificar' data-bs-toggle="modal" data-bs-target="#dataModification">Modificar</button>
                    </div>
                </div>
            </div>
            `
            });
            const listBtnModificar = document.getElementsByClassName('listBtnModificar'); 
            for(let btn of listBtnModificar) {
                btn.addEventListener("click", modificar)
            }
            const listBtnEliminar = document.getElementsByClassName('listBtnEliminar');
            for (let btn of listBtnEliminar) {
                btn.addEventListener("click", deleteProduct)
            }
        });
}
//TODO: AGREGAMOS UN NUEVO PRODUCTO A LA TIENDA | ENVIAMOS LOS DATOS AL SOCKET
const form = document.getElementById("productForm");
form.addEventListener('submit', async (e) => {
    e.preventDefault(); //evita que al enviar los datos se resfresque la pagina 
    let data = new FormData(form); //Obtenemos los datos que ingresaron en el formulario | estrucuta de datos diferente
    let obj = {}; //creamos un objeto
    /* Los que hacemos con forEach es agarrar la estrutura del forData y lo arma en un objeto*/
    data.forEach((value, key) => obj[key] = value);
    
    //Modificamos el fetch ya que no podemos subir imagenes como json
    await fetch("/api/products", {
        method: "POST",
        body: data //Mandamos al objeto directamente
    })
        .then(result => result.json())
        .then(async result => {
            if (result.proload === -1) message('error', 'ERROR CODE: el codigo del producto se repite');
            else {
                message('success', 'Su producto se guardo correctamente')
                await socket.emit('newProduct');
            };
        })
    await mostrarProducto();

})
const message = (icon, text) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        title: text,
        icon: icon
    })
}
// -----------------------------------------------------
//TODO: MODIFICACION DE DATOS
const modificar = async(event) =>{
    let dataProduct;
    await fetch(`/api/products/${event.target.id}`).then(result => result.json()).then(json => {dataProduct = json})
    inputForm.innerHTML = 
        `
        <div class="col m-3">
            <div class='d-flex justify-content-between align-items-center'>
                <label class='form-label' for="name">Nombre del Producto</label>
                <p id='idCode' data-bs-target='${dataProduct.code}'>Codigo: ${dataProduct.code}</p>
            </div>
            
            <input class='form-control' type="text" name="name" id="name" value='${dataProduct.name}'>
        </div>
        <div class="col m-3">
                <label for="description" class="form-label">Descripcion</label>
                <textarea class="form-control" id="description" name="description" rows="3">${dataProduct.description}</textarea>
        </div>
        <div class="col m-3">
            <label class='form-label' for="image">Cambiar imagen</label>
            <div class='row'>
                <div class="col ">
                    <img src= ${dataProduct.image} alt="${dataProduct.name}" width="80" height='80'>
                </div>
                <div class="col ">
                    
                </div>
                
                <input class='form-control' type="file" name="image" id="image">
            </div>
        </div>
        <div class="row">
            <div class="col ">
                <label class='form-label' for="price">Precio</label>
                <input class='form-control' type="number" name="price" id="price" value='${dataProduct.price}'> 
            </div>
            <div class="col ">
               <label class='form-label' for="stock">Stock</label>
               <input class='form-control' type="number" name="stock" id="stock" value='${dataProduct.stock}'>
            </div>
        </div>
        `
}

btnModify.addEventListener('click', async(e)=>{
    let data = new FormData(formModify); //Obtenemos los datos que ingresaron en el formulario | estrucuta de datos diferente
    let obj = {}; //creamos un objeto
    data.forEach((value, key) => obj[key] = value);
    const idCode = document.getElementById('idCode');

    await fetch(`/api/products/modifyProduct/${idCode.dataset.bsTarget}`, {
        method:'PUT',
        body: data
    }).then(result => result.json()).then(json => console.log(json));

    await mostrarProducto();

    Swal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: 'La modificacion ha sido un exito',
        icon: 'success'
    })
})
//------------------------------------------------------

//TODO: ENVIO DE MENSAJE CON EL ENTER
chatBox.addEventListener(('keyup' || 'submit'), evt => {
    if (evt.key === 'Enter' || evt.keyCode === 13) {
        if (chatBox.value.trim().length > 0) { //eliminamos los espacios del mensaje
            //Emite un evento del socket | por cada emit tiene que haber un on que lo escuche
            socket.emit('message', { autor: { id: user[1], name: user[0], email: user[1], avatar: user[2] }, text: { message: chatBox.value.trim() } });
            chatBox.value = '';
        }
    }
})
const designMessage = (data) => {
    let html = '';
    data.forEach(msgs => {
        if (msgs.autor.name !== user[0]) {
            html = `
            <div class='userMessage d-flex'>
                <div>
                    <img src='${msgs.autor.avatar}' alt='avatar' width="40">
                </div>
                <div>
                    <p>${msgs.autor.name}</p>
                    <p class='designMessage'>${msgs.text.message}</p> 
                </div>
                <br/>
            </div>
            `
        }
        else {
            html = `
            <div class='messageRight d-flex justify-content-end'>
                <div>
                    <p>${msgs.autor.name}</p>
                    <p class='designMessage'>${msgs.text.message}</p> 
                </div>
                <div>
                    <img src='${msgs.autor.avatar}' alt='avatar' width="40">
                </div>
                <br/>
            </div>
            `
        }
    })
    return html;
}
//-----------------------------------------------------
//Todo: SOCKET ESCUCHANDO EVENTOS
//Creamos este socket.on para que escuche el emit del servidor
socket.on('logs', data => {
    let message = designMessage(data);
    //realizamos un for parra que se muestre los mensajes de los usuarios | agregamos diseño
    msg.innerHTML += message;
})
socket.on('addProduct', async data => {
    await mostrarProducto();
})
socket.on('newUserConnected', data => {
    if (!user) return;
    msg.innerHTML += `<p class='logIn'>${data[0]} se ha unido al chat</p>`
})
