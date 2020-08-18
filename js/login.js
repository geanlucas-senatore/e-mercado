//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {


});

function funcionamiento() {
    let guardar = localStorage.setItem("correo", document.getElementById("email").value);
    let guardar2 = localStorage.setItem("contra", document.getElementById("contra").value);

}
let codigo = localStorage.getItem("correo");
let codigo2 = localStorage.getItem("contra");
document.getElementById("hola").innerHTML = "hola&nbsp" + codigo;
//if que cuestiona si codigo y codigo 2 estan en index.html
//si no estan los redirige
if (codigo == null) {
    if (codigo2 == null) {
        window.location = "login.html";
    }
}
//if que cuestiona si en los campos de texto se se escribio
//en cada caso si hay algun de los campos o los dos sin rellenar
//se redirige 
if (codigo && !codigo2 || !codigo && codigo2 || !codigo && !codigo2) {

    window.location = "login.html";

}
//borra lo guardado en el local storage si se apreta el boton salir de index.html
function borrar() {
    localStorage.removeItem("correo");
    localStorage.removeItem("contra");
}