const btnLess = document.getElementById('btnLess');
const btnCount = document.getElementById('btnCount');
const btnBig = document.getElementById('btnBig');
const btnBuy = document.getElementById('btnBuy');
const divError = document.getElementById('divError');
// const contador = document.getElementById('contador');

btnLess.addEventListener('click', event => {
    let valor = btnCount.value;
    if (valor > 0) btnCount.value = parseInt(btnCount.value) - 1;
})

btnBig.addEventListener('click', async event => {
    let valor = parseInt(btnCount.value);
    let id = btnBuy.dataset.bsTarget;
    let product;
    //obtenemos la informacion del product
    await fetch(`/api/products/${id}`, {
        method: 'GET'
    }).then(result => result.json()).then(json => { product = json })
    product = product.proload[0]; //guardamos los datos 

    //validadmos el stock
    if (valor < parseInt(product.stock)){
        btnCount.value = parseInt(btnCount.value) + 1;
        divError.innerHTML = ''
    }
    else {
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            title: 'Llegaste al limite del stock',
            icon: 'error'
        })
    }
})

btnBuy.addEventListener('click', async event => {
    const btnCount = document.getElementById('btnCount').value;
    let idProduct = btnBuy.dataset.bsTarget;
    if(btnCount !== '0'){
        let data;
        await fetch(`/api/carrito/${idProduct}/${btnCount}`,{
            method: 'POST'
        })
        .then(result => result.json())
        .then(json => {data = json.proload})

        contador.innerText = data.count;

        Swal.fire({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 4000,
            title: 'Se añadio un producto',
            icon: 'success'
        })
    }
    else{
        divError.innerHTML = 
        `<div class="alert alert-danger text-center w-100 p-1 mt-lg-5" role="alert">
            <p class='m-1'>La cantidad del producto debe ser mayor a 0</p>
        </div>`
    }
    
})