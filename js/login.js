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
document.getElementById("hola").innerHTML = codigo + " " + codigo2;
if (codigo == null) {
    if (codigo2 == null) {
        window.location.replace("login.html");
    }
}
if (codigo && !codigo2 || !codigo && codigo2) {
    window.location.replace("login.html");
}

function borrar() {
    localStorage.removeItem("correo");
    localStorage.removeItem("contra");
}
window.onbeforeunload = function() { localStorage.clear(); return ''; }