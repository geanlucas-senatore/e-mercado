var informa = [];
let listaPrueba = 0;



function mostrar(array) {
    listaProductos = '';
    let tomarArticulos = 0;

    for (let i = 0; i < array.length; i++) {
        let productos = array[i];
        let indice = i;

        let precioCantidad = productos.unitCost * productos.count;


        if (productos.currency === "USD") {
            tomarArticulos += precioCantidad;
            listaProductos += `
            <tr>
                <td><img src=${productos.src}></td>
                <td>${productos.name}</td>
                <td>${productos.unitCost}USD</td>
                <td><input type="number" class="form-control" id="contador" onchange="cantidadAuto(this.value,${productos.unitCost},${indice})" placeholder="" value=${productos.count} min="0"></td>
                <td id="cambiar">${precioCantidad}USD</td>
                <td><button class="btn btn-danger" onclick="borrarTabla(${indice})">Borrar</button></td>
            </tr>
            `;
        } else {
            tomarArticulos += precioCantidad / 40;
            listaProductos += `
            <tr>
                <td><img src=${productos.src}></td>
                <td>${productos.name}</td>
                <td>${productos.unitCost/40}USD</td>
                <td><input type="number" class="form-control" id="contador2" onchange="cantidadPino(this.value,${productos.unitCost},${indice})" placeholder="" value=${productos.count} min="0"></td>
                <td id="cambiar2">${precioCantidad/40}USD</td>
                <td><button class="btn btn-danger" onclick="borrarTabla(${indice})">Borrar</button></td>
            </tr>
            
            `;
        }


    };


    document.getElementById("lista").innerHTML = listaProductos;
    document.getElementById("cuenta").innerHTML = tomarArticulos;
    document.getElementById("cuenta2").innerHTML = 0;
    document.getElementById("total").innerHTML = 0;



    //eleccion de tipo de envio
    document.getElementById("goldradio").addEventListener("change", function() {
        let precio = 0;
        precio += parseFloat(document.getElementById("cuenta").innerHTML);
        let calculoGold = (precio * 15) / 100;
        document.getElementById("cuenta2").innerHTML = calculoGold;
        calculoTotal();
    });
    document.getElementById("premiumradio").addEventListener("change", function() {
        let precio = 0;
        precio += parseFloat(document.getElementById("cuenta").innerHTML);
        let calculoPremium = (precio * 7) / 100;
        document.getElementById("cuenta2").innerHTML = calculoPremium;
        calculoTotal();
    });
    document.getElementById("standardradio").addEventListener("change", function() {
        let precio = 0;
        precio += parseFloat(document.getElementById("cuenta").innerHTML);
        let calculoEstandar = (precio * 5) / 100;
        document.getElementById("cuenta2").innerHTML = calculoEstandar;
        calculoTotal();
    });



}

//borrar tabla
function borrarTabla(numeroIndice) {

    informa["articles"].splice(numeroIndice, 1);
    mostrar(informa["articles"]);

}

//calculo de subtotal y costo de envio
function calculoTotal() {

    let tomarCuentas = 0;
    let tomarTotal = document.getElementById("total");
    tomarCuentas += parseFloat(document.getElementById("cuenta").innerHTML);
    tomarCuentas += parseFloat(document.getElementById("cuenta2").innerHTML);
    tomarTotal.innerHTML = tomarCuentas;
}
//eleccion de tarjeta de credito
document.getElementById("tarjetacredito").addEventListener("change", function() {

    let barra = document.getElementById("elegirPago");
    let textoCredito = document.getElementById("textoelegir");
    textoCredito.innerHTML = "Elegiste pagar con tarjeta de credito";
    barra.innerHTML = `<button type="button" class="m-1 btn btn-primary" data-toggle="modal" data-target="#contidionsModal2">Cambiar metodo de pago</button>`;

});
//eleccion de cuenta bancaria
document.getElementById("cuentabancaria").addEventListener("change", function() {

    let barra = document.getElementById("elegirPago");
    let textoCredito = document.getElementById("textoelegir");
    textoCredito.innerHTML = "Elegiste pagar con cuenta bancaria";
    barra.innerHTML = `<button type="button" class="m-1 btn btn-primary" data-toggle="modal" data-target="#contidionsModal2">Cambiar metodo de pago</button>`;

});
//simulacion de compra
form.onsubmit = function(evento) {

        evento.preventDefault();

        if (document.getElementById("textoelegir").innerHTML === "Elegiste pagar con tarjeta de credito") {

            window.location = "cart.html";

        } else if (document.getElementById("textoelegir").innerHTML === "Elegiste pagar con cuenta bancaria") {

            window.location = "cart.html";

        } else {
            alert("Debes elegir forma de pago");
        }

    }
    //calcula el precio de cantidad por unidad en base al contador del auto
function cantidadAuto(valor, precio, indice) {

    let dato = precio;
    let numero = informa["articles"][indice].count = valor;
    let cuenta = dato * numero;
    document.getElementById("cambiar").innerHTML = cuenta + "USD";
    mostrar(informa["articles"]);
}

//calcula el precio de cantidad por unidad en base al contador del pino
function cantidadPino(valor, precio, indice) {

    let dato = precio / 40;

    let numero = informa["articles"][indice].count = valor;
    let cuenta = dato * numero;
    document.getElementById("cambiar2").innerHTML = cuenta + "USD";
    mostrar(informa["articles"]);


}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            informa = resultObj.data;

            mostrar(informa["articles"]);

            document.getElementById("alerta").innerHTML = informa["articles"].length;


        }
    });


});