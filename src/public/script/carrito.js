const btnCarrito = document.getElementById('btnCarrito');
const listProduct = document.getElementById('listProduct');
const sendProduct = document.getElementsByClassName('btnBuyProduct');
const countProduct = document.getElementById('countProduct')
const btnCart = document.getElementById('btnCart')
const divBtnCart = document.getElementById('divBtnCart');
const collapseExample = document.getElementById('collapseExample');


let carrito = false;
let idCarrito;

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
const comprar = async(event) =>{
    let verifyUser;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json=> {verifyUser = json});
    if(verifyUser.status === 'error'){
        location.href = verifyUser.ruta;
    }
    else{
        let data = verifyUser.payload;
        if(data.idCart === '') data = await createCart();
        idCarrito = data.idCart;
        const idProduct = event.target.dataset.bsTarget;
        location.href = `/tienda/product/${idProduct}`
    }
}

//! Crea el evento a todos los botones que tengan la clase btnBuyProduct
for(let btn of sendProduct) {
    btn.addEventListener("click", comprar)
}


