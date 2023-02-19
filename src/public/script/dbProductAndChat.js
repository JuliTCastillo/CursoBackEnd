const socket = io({
    autoConnect: false, //no se conecta al servidor hasta que se lo indiquemos
});
const send = document.getElementById('send'); //el boton de enviar
const msg = document.getElementById('msg'); //Div que se encuentra en el modal-body
const chatBox = document.getElementById('chatBox')
const listProduct = document.getElementById('listProduct');
const btnCarrito = document.getElementById('btnCarrito');
let estado = true;
let user = [];

//TODO: INGRESO DE USUARIO - VALIDAMOS EL NOMBRE Y MOSTRAMOS PRODUCTOS
while (estado) {
    //Creamos una variable que guarde un array
    const { value: formValues } = await Swal.fire({
        title: 'Iniciar sesion',
        html:
            `
            <div class='m-3'>
                <label for='swal-input1' class='form-label d-block text-lg-start'>Ingrese su nombre</label>
                <input id="swal-input1" class="swal2-input m-0 w-100">
            </div>
            <div class='m-3'>
                <label for='swal-input1' class='form-label d-block text-lg-start'>Ingrese su email</label>
                <input id="swal-input2" class="swal2-input m-0 w-100">
            </div>
            <div id='error'></div>
        `,
        allowOutsideClick: false,
        focusConfirm: false,
        preConfirm: () => {
            //Nos devuelve un array con el valor de los inputs
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
            ]
        }
    })
    //Verificamos si los arrays contiene algun texto
    if (formValues[0] !== '' && formValues[1] !== '') {
        estado = false; //Colocamos el estado a falso para salir del while
        //generamos un avatar para el usuario
        formValues.push(`https://api.dicebear.com/5.x/micah/svg?seed=${formValues[0]}`)
        user = formValues; //guardamos todo en nuestra variable user
    }
    else { //en el caso que nuestro usuario no haya ingresado, le advertimos con un alert
        await Swal.fire({
            icon: 'error',
            title: 'Campos Vacios',
            text: 'Por favor, complete los campos vacio!',
        })
    }
}

//? una vez que se completaron los datos nos conetamos con el socket
socket.connect(); //nos conectamos al socket
socket.emit('authenticated', user);
mostrarProducto();

const deleteProduct = async (event) => {
    console.log('dentro de deleteProduct')
    console.log('id que obtenemos', event.target.code);
    await fetch(`/api/products/${event.target.id}`, {
        method: 'DELETE'
    })
        .then(result => result.json()).then(json => console.log(json));
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
                        <button class='btn btn-warning listBtnModificar' id='${element.code}'>Modificar</button>
                    </div>
                </div>
            </div>
            `
            });
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
        console.log('a', msgs)
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
    console.log('estamos en logs')
    let message = designMessage(data);
    //realizamos un for parra que se muestre los mensajes de los usuarios | agregamos diseño
    msg.innerHTML += message;
})
socket.on('addProduct', async data => {
    await mostrarProducto();
})
socket.on('newUserConnected', data => {
    if (!user) return;
    console.log('newUser', data)
    msg.innerHTML += `<p class='logIn'>${data[0]} se ha unido al chat</p>`
})
