const btnLess = document.getElementById('btnLess');
const btnCount= document.getElementById('btnCount');
const btnBig = document.getElementById('btnBig');
const btnBuy = document.getElementById('btnBuy');

btnLess.addEventListener('click', event =>{
    let valor = btnCount.value;
    
    if(valor > 0) btnCount.value = parseInt(btnCount.value) - 1;
    else console.log('no se admine valores negativos')
})

btnBig.addEventListener('click', async event =>{
    let valor = parseInt(btnCount.value);
    let id = btnBuy.dataset.bsTarget;
    let product;
    //obtenemos la informacion del product
    await fetch(`/api/products/${id}`,{
        method: 'GET'
    }).then(result => result.json()).then(json => {product = json})
    product = product.proload[0]; //guardamos los datos 

    //validadmos el stock
    if(valor < parseInt(product.stock)) btnCount.value = parseInt(btnCount.value) + 1;
    else console.log('No hay mas stock del producto')
})