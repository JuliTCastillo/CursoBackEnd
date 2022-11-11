const form = document.getElementById("productForm");
form.addEventListener('submit', e =>{
    e.preventDefault(); //evita que al enviar los datos se resfresque la pagina 
    let data = new FormData(form); //Obtenemos los datos que ingresaron en el formulario | estrucuta de datos diferente
    let obj = {}; //creamos un objeto
    /* Los que hacemos con forEach es agarrar la estrutura del forData y lo arma en un objeto*/
    data.forEach((value, key) => obj[key] = value); 
    //Modificamos el fetch ya que no podemos subir imagenes como json
    fetch("/api/products",{
        method:"POST",
        body:data //Mandamos al objeto directamente
    }).then(result => result.json()).then(json=>console.log(json))

    fetch("/api/products/:id", {
        method : "PUT",
        body: data
    }).then(result => result.json()).then(json=>console.log(json))
})
















// fetch("/api/products", { //Como estamos usando nuestro servidor solo basta ingresar la ruta principal
//     method: "POST", //El metodo que usamos para conectarnos con el endpoint
//     body: JSON.stringify(obj), //Cual es el cuerpo que mandamos es decir los datos
//     headers:{ //Nos sirve para que el servidor sepa que tipo de datos le mandamos
//         "Content-Type" : "application/json"
//     }
// }).then(result => result.json()).then(json=>console.log(json))