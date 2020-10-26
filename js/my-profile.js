let informa = [];
let nombreGuardado = localStorage.getItem("correo");


function mostrarInformacion() {

    infoGuardada = localStorage.getItem(nombreGuardado);

    if (infoGuardada !== null) {


        infoParseada = JSON.parse(infoGuardada);


        for (i = 0; i < infoParseada.length; i++) {

            let info = infoParseada[i];


            document.getElementById("nombretomado").value = info.nombre;
            document.getElementById("edadtomada").value = info.edad;
            document.getElementById("emailtomado").value = info.email;
            document.getElementById("direcciontomada").value = info.direccion;

        }
    }
}

form.onsubmit = function(evento) {

    evento.preventDefault();

    let nombreToma = document.getElementById("nombretomado").value;
    let edadToma = document.getElementById("edadtomada").value;
    let mailToma = document.getElementById("emailtomado").value;
    let dirToma = document.getElementById("direcciontomada").value;

    let guardarJson = JSON.stringify([{ usuario: nombreGuardado, nombre: nombreToma, edad: edadToma, email: mailToma, direccion: dirToma }]);

    localStorage.setItem(nombreGuardado, guardarJson);

}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(CART_INFO2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            informa = resultObj.data;


            document.getElementById("alerta").innerHTML = informa["articles"].length;
        }
    });
    mostrarInformacion();
    //localStorage.removeItem("informacion");
});