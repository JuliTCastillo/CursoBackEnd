const formRegister = document.getElementById('formRegister');

const menssage = (text, icon) =>{
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        title:  text,
        icon: icon
    })
}

formRegister.addEventListener('submit' , async e =>{
    e.preventDefault();
    let data = new FormData(formRegister);
    let obj = {}

    data.forEach((value, key) => obj[key] = value);
    obj.avatar = (`https://api.dicebear.com/5.x/micah/svg?seed=${obj.firstName}`)
    console.log(obj);
     //Modificamos el fetch ya que no podemos subir imagenes como json
     await fetch("/api/user/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj) //Mandamos al objeto directamente
    })
    .then(result => result.json())
    .then(json => {
        if(json.status === 'error') menssage(json.error, json.status)
        else{
            menssage(json.proload, json.status)
            location.href = '/tienda'
        }
    })
})


