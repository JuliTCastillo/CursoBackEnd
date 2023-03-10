const iconUser = document.getElementById('iconUser');
const iconLogin = document.getElementById('iconLogin');
const divBtnCart = document.getElementById('divBtnCart');
const countProduct = document.getElementById('countProduct');
const btnCarrito = document.getElementById('btnCarrito');
const contador = document.getElementById('contador');
const listProduct = document.getElementById('listProduct');
const btnCart = document.getElementById('btnCart');
const btnLogout = document.getElementById('btnLogout');
const itemAdmin = document.getElementById('itemAdmin');
const collapseExample = document.getElementById('collapseExample')

btnLogout.addEventListener('click', async(e) =>{
    await fetch(`/api/user/logout`).then(result => result.json()).then(json=> console.log(json));
    location.href = '/tienda';
})

const verifyUser = async () => {
    let answer;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json => { answer = json });
    console.log('answer es igual', answer)
    if (answer.status === 'success') {
        let data = answer.payload;
        console.log('answer. payload ', data)
        iconLogin.classList.add('d-none');
        iconUser.innerHTML =
            `
                <img class='d-flex justify-content-center align-items-center p-0 m-auto' src='${data.avatar}' width='40'>
                <p class='text-center m-1'>${data.name}</p>
            `
        await verifyCart(data)
        if(data.idCart !== '') await infoCart(data.idCart);

        if(data.role === 'admin'){
            itemAdmin.innerHTML = `<a class="nav-link" href="/admin">Administrar</a>`
        }
    }
    else {
        iconLogin.innerHTML =
            `
                <i class='bx bx-user-circle bx-lg' style='color:#fdf7f7'></i>
                <p class='text-center m-1'>Login</p>
            `
    }
}

const verifyCart = async () => {
    let data;
    await fetch(`/api/user/data`).then(result => result.json()).then(json => { data = json.payload });

    if (data.idCart === '') {
        divBtnCart.innerHTML = '<button type="submit" class="btn btn-success" id="btnCarrito">Comenzar compra</button>'
    }
    else {
        divBtnCart.classList.add('ocultar');
        btnCarrito.classList.add('ocultarBoton');
        countProduct.classList.remove('ocultar')
    }

}

const infoCart = async(idCart) =>{
    let data;
    await fetch(`/api/carrito/${idCart}`)
    .then(result => result.json())
    .then(json => {data = json})

    contador.innerText = data.count;
}

//TODO: FUNCIONALIDAD DEL CARRITO
const finalizarComprar = async(event) =>{
    let infoUser;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json=> {infoUser = json.payload});
    await fetch(`/api/products/updateStock`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify(infoUser)
    }).then(result => result.json()).then(json=> console.log(json));

    await Swal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        title: 'Su compra hacido procesada correctamente',
        icon: 'success'
    })

    collapseExample.classList.remove('show');

    location.href = '/tienda'
}

const eliminarProduct =async(event) =>{
    let infoUser;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json=> {infoUser = json.payload});

    fetch(`/api/carrito/${infoUser.idCart}/productos/${event.target.id}`,{
        method:'DELETE'
    })

    //ocultamos el collapse de los productos
    collapseExample.removeAttribute('class')
    collapseExample.classList.add('designCollapse')
    collapseExample.classList.add('collapse')
    btnCart.ariaExpanded = false;
    //Notificamos la eliminacion del producto
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        title: 'Su producto se elimino correctamente',
        icon: 'success'
    })

    const contador = document.getElementById('contador');
    contador.innerText = parseInt(contador.textContent) - 1; 
}
const eliminarCarrito = async() =>{
    let infoUser;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json=> {infoUser = json.payload});
    console.log(infoUser)
    //Eliminamos el carrito
    await fetch(`/api/carrito/${infoUser.idCart}`,{
        method: 'DELETE'
    }).then(result => result.json()).then(json=> console.log(json));
    //Ocultar collapse de lista de producto
    countProduct.classList.add('ocultar');
    collapseExample.removeAttribute('class')
    collapseExample.classList.add('designCollapse')
    collapseExample.classList.add('collapse')
    btnCart.ariaExpanded = false;
    //Mostramos el boton para crear el carrito
    divBtnCart.classList.remove('ocultar'); 
    btnCarrito.classList.remove('ocultarBoton');
    //Reseteamos el contador a 0
    const contador = document.getElementById('contador');
    contador.innerText = 0;
    //Ponemos el falso el estado del carrito
    carrito=false;
}
btnCarrito.addEventListener('click', async(e) =>{
    idCarrito = await createCart();
})
const createCart = async() =>{
    let myJson;
    //guardamos los datos recibido por el fetch en una variable | indicamos el metodo    
    await fetch('/api/carrito',{method:"POST"}).then(result => result.json()).then(json=> {myJson = json});
    //la informacion recibida la convertimos a json
    //removemos el boton 
    divBtnCart.classList.add('ocultar'); 
    btnCarrito.classList.add('ocultarBoton');
    countProduct.classList.remove('ocultar')
    carrito = true; //funciona como una variable flag
    return myJson;
}
btnCart.addEventListener('click', e =>{
    mostrarProductos();
})
const mostrarProductos = async() =>{
    let infoUser;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json=> {infoUser = json.payload});
    console.log(infoUser.idCart)
    await fetch(`/api/carrito/${infoUser.idCart}/productos`).then(result => result.json())
    .then(json => {
        //obtenemos el objeto del carrito y especificamos que solo queremos los productos
        let precioTotal = showProduct(json.product);
        //mostramos el precio total de los productos
        listProduct.innerHTML+= 
            `
                <hr>
                <div>
                    <h3 class='text-center'>Precio Total: $${precioTotal}</h3>
                </div>
                <button class='btn btn-success' id='btnComprar'>Comprar</button>
                <button class='btn btn-primary mt-lg-2' id='btnDeleteCart'>Eliminar Carrito</button>
            `
        //creamos el evento de los botones
        const btnDelete = document.getElementsByClassName('btnDelete');
        for(let btn of btnDelete) {
            btn.addEventListener("click", eliminarProduct)
        }
        // creamos el evento del boton del carrito
        const btnDeleteCart = document.getElementById('btnDeleteCart');
        btnDeleteCart.addEventListener('click', eliminarCarrito)
        const btnComprar = document.getElementById('btnComprar')
        btnComprar.addEventListener('click', finalizarComprar)
    })
}
const showProduct = (object) =>{
    let precioTotal=0;
    listProduct.innerHTML = `<h2 class='text-center'>Lista de Productos</h2><hr>`;
    object.forEach(element => {
        listProduct.innerHTML+=
        `
            <div class='row gap-3 d-flex justify-content-center align-items-center bordeProduct'>
                <div class= 'col-3'>
                    <img src='${element.image}' alt='product' width='100%'>
                </div>
                <div class= 'col-5'>
                    <h3>${element.name}</h3>
                    <div class='d-flex justify-content-between align-items-center'>
                        <p>precio: ${element.price}</p>
                        <p>cantidad: ${element.count}</p>
                    </div>
                    <button class='btn btn-danger btnDelete' id='${element.code}'>Eliminar Carrito</button>
                </div>
             </div>
        `
        precioTotal+= parseInt(element.price) * parseInt(element.count);
    });
    return precioTotal;
}

let data = verifyUser()