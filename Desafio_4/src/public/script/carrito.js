const btnCarrito = document.getElementById('btnCarrito');
const cart = document.getElementById('cart');
const listProduct = document.getElementById('listProduct');
const sendProduct = document.getElementsByClassName('btnBuyProduct');
const countProduct = document.getElementById('countProduct')
const btnCart = document.getElementById('btnCart')
const divBtnCart = document.getElementById('divBtnCart');
const collapseExample = document.getElementById('collapseExample');

let carrito = false;
let idCarrito;

const eliminarProduct =async(event) =>{
    console.log(event.path[0].id)
    fetch(`/api/carrito/${idCarrito.proload}/productos/${event.path[0].id}`,{
        method:'DELETE'
    })
    .then(result => result.json()).then(json=>console.log(json));

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
    //Eliminamos el carrito
    await fetch(`/api/carrito/${idCarrito.proload}`,{
        method: 'DELETE'
    }).then(result => result.json()).then(json=>console.log(json));
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
    //guardamos los datos recibido por el fetch en una variable | indicamos el metodo    
    let response = await fetch('/api/carrito',{method:"POST"});
    //la informacion recibida la convertimos a json
    let myJson = await response.json();
    //removemos el boton 
    divBtnCart.classList.add('ocultar'); 
    btnCarrito.classList.add('ocultarBoton');
    countProduct.classList.remove('ocultar')
    carrito = true; //funciona como una variable flag
    return myJson;
}
const comprar = async(event) =>{
    //Si el carrito no esta creado | creamos uno
    if(!carrito) idCarrito = await createCart();
    //a traves del evento obtenemos la id del producto que se esta seleccionando
    let response = await fetch(`/api/products/${event.path[0].id}`)
    let myJson = await response.json();

    //Pasamos el producto seleccionado con fetch
    await fetch(`/api/carrito/${idCarrito.proload}/productos`,{
        method:"POST", //indicamos el metodo
        //TODO IMPORTANTE : AGREGAMOS EL [0] PORQUE CON SQLITE3 NOS DEVUELVE UN ARRAY
        body: JSON.stringify(myJson[0]), // pasamos a JSON el objeto
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(result => result.json()).then(json=>console.log(json))
   
    const contador = document.getElementById('contador');
    contador.innerText = parseInt(contador.textContent) + 1 
}

btnCart.addEventListener('click', e =>{
    mostrarProductos();
})

const mostrarProductos = () =>{
    fetch(`/api/carrito/${idCarrito.proload}/productos`)
    .then(result => result.json())
    .then(json => {
        let precioTotal=0;
        listProduct.innerHTML = `<h2 class='text-center'>Lista de Productos</h2><hr>`;
        json.forEach(element => {
            listProduct.innerHTML+=
            `
                <div class='row gap-3 d-flex justify-content-center align-items-center bordeProduct'>
                    <div class= 'col-3'>
                        <img src='${element.image}' alt='product' width='100%'>
                    </div>
                    <div class= 'col-5'>
                        <h3>${element.name}</h3>
                        <p>precio: ${element.price}</p>
                        <button class='btn btn-danger btnDelete' id='${element.id}'>Eliminar</button>
                    </div>
                </div>
            `
            precioTotal+= parseInt(element.price);
        });
        //mostramos el precio total de los productos
        listProduct.innerHTML+= 
        `
            <hr>
            <div>
                <h3 class='text-center'>Precio Total: ${precioTotal}</h3>
            </div>
            <button class='btn btn-primary' id='btnDeleteCart'>Eliminar Carrito</button>
        `
        //creamos el evento de los botones
        const btnDelete = document.getElementsByClassName('btnDelete');
        for(let btn of btnDelete) {
            btn.addEventListener("click", eliminarProduct)
        }
        //creamos el evento del boton del carrito
        const btnDeleteCart = document.getElementById('btnDeleteCart');
        btnDeleteCart.addEventListener('click', eliminarCarrito)
    })
}

//! Crea el evento a todos los botones que tengan la clase btnBuyProduct
for(let btn of sendProduct) {
    btn.addEventListener("click", comprar)
  }

