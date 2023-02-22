const iconUser = document.getElementById('iconUser');
const iconLogin = document.getElementById('iconLogin');
const divBtnCart = document.getElementById('divBtnCart');
const countProduct = document.getElementById('countProduct');
const btnCarrito = document.getElementById('btnCarrito');

const verifyUser = async () => {
    let answer;
    await fetch(`/api/user/verifyUser`).then(result => result.json()).then(json => { answer = json });
    console.log(answer)
    if (answer.status === 'success') {
        let data = answer.payload;
        console.log(data);
        iconLogin.classList.add('d-none');
        iconUser.innerHTML =
            `
            <img class='d-flex justify-content-center align-items-center p-0 m-auto' src='${data.avatar}' width='40'>
            <p class='text-center m-1'>${data.name}
        `
        await verifyCart(data)
    }
    else {
        iconLogin.innerHTML =
            `<i class='bx bx-user-circle bx-lg' style='color:#fdf7f7'></i>`
    }
}

const verifyCart = async (userConnect) => {
    let data;
    await fetch(`/api/user/data`).then(result => result.json()).then(json => { data = json.payload });
    console.log('soy la data de verifyCart ', data)

    if (data.idCart === '') {
        divBtnCart.innerHTML = '<button type="submit" class="btn btn-success" id="btnCarrito">Comenzar compra</button>'
    }
    else {
        divBtnCart.classList.add('ocultar');
        btnCarrito.classList.add('ocultarBoton');
        countProduct.classList.remove('ocultar')
    }

}


let data = verifyUser()