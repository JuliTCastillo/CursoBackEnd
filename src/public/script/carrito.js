const btnCarrito = document.getElementById('btnCarrito');
const listProduct = document.getElementById('listProduct');
const sendProduct = document.getElementsByClassName('btnBuyProduct');
const countProduct = document.getElementById('countProduct')
const btnCart = document.getElementById('btnCart')
const divBtnCart = document.getElementById('divBtnCart');
const collapseExample = document.getElementById('collapseExample');
const btnComprar = document.getElementById('btnComprar')

let carrito = false;
let idCarrito;
const finalizarComprar = async(event) =>{
    let infoUser, infoProduct;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json=> {infoUser = json.payload});
    await fetch(`/api/carrito/${infoUser.idCart}/productos`).then(result => result.json()).then(json => {infoProduct = json})

    infoProduct.forEach(element => {
        console.log(element.id, ' ', element.stock, ' ', element.count);
    });
    //await fetch(`/api/products/:idProduct/:stock1`).then(result => result.json()).then(json=> {infoUser = json.payload});
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
    console.log('INGRESAMOS A CREATECART()')
    //guardamos los datos recibido por el fetch en una variable | indicamos el metodo    
    await fetch('/api/carrito',{method:"POST"}).then(result => result.json()).then(json=> {myJson = json});
    console.log('salimos del fetch de carrito')
    //la informacion recibida la convertimos a json
    //removemos el boton 
    divBtnCart.classList.add('ocultar'); 
    btnCarrito.classList.add('ocultarBoton');
    countProduct.classList.remove('ocultar')
    carrito = true; //funciona como una variable flag
    console.log('A un paso del return');
    console.log('myJson ', myJson)
    return myJson;
}
const comprar = async(event) =>{
    let verifyUser;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json=> {verifyUser = json});
    if(verifyUser.status === '400'){
        location.href = verifyUser.ruta;
    }
    else{
        let data = verifyUser.payload;
        console.log('data de comprar() ', data)
        if(data.idCart === '') data = await createCart();
        idCarrito = data.idCart;
        const idProduct = event.target.dataset.bsTarget;
        location.href = `/tienda/product/${idProduct}`
    }
}
btnCart.addEventListener('click', e =>{
    mostrarProductos();
})
const mostrarProductos = async() =>{
    let infoUser;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json=> {infoUser = json.payload});
    await fetch(`/api/carrito/${infoUser.idCart}/productos`)
    .then(result => result.json())
    .then(json => {
        let precioTotal = showProduct(json);
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
        //creamos el evento del boton del carrito
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
        precioTotal+= parseInt(element.price);
    });
    return precioTotal;
}
//! Crea el evento a todos los botones que tengan la clase btnBuyProduct
for(let btn of sendProduct) {
    btn.addEventListener("click", comprar)
}


