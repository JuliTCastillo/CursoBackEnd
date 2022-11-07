const form = document.getElementById("formModificar");

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    fetch("/api/products/:id", {
        method: "PUT",
        body: data
    }).then(result => result.json()).then(json=>console.log(json));
})