const form = document.getElementById("formEliminar");

form.addEventListener('submit', e =>{
    e.preventDefault();
    const data = new FormData(form);
    let obj = {};
    data.forEach((value, key) => obj[key] = value); 
    fetch("/api/products/:id", {
        method: "DELETE", //El metodo que usamos para conectarnos con el endpoint
        body: JSON.stringify(obj), //Cual es el cuerpo que mandamos es decir los datos
        headers:{ //Nos sirve para que el servidor sepa que tipo de datos le mandamos
            "Content-Type" : "application/json"
        }
    }).then(result => result.json());
})