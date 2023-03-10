const formRegister = document.getElementById('formRegister');

//Estrutura para el mensaje
const menssage = async(text, icon, position) =>{
    await Swal.fire({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 4000,
        title:  text,
        icon: icon
    })
}

formRegister.addEventListener('submit' , async e =>{
    e.preventDefault();
    let data = new FormData(formRegister);
    let obj = {};
    let answer;

    data.forEach((value, key) => obj[key] = value);
    obj.avatar = (`https://api.dicebear.com/5.x/micah/svg?seed=${obj.firstName}`)
     //Modificamos el fetch ya que no podemos subir imagenes como json
     await fetch("/api/user/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj) //Mandamos al objeto directamente
    }).then(result => result.json()).then(json => {answer=json})

    if(answer.status === 'error') menssage(answer.error, answer.status, "bottom-end")
    else{
        await menssage('El usuario fue registrado correctamente','success', "bottom-end")
        location.href = '/tienda';
    }
})


