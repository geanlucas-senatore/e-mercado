var informa = [];
let listaPrueba = 0;
let numero = 0;


function mostrar(array) {
    listaProductos = '';


    for (let i = 0; i < array.length; i++) {
        let productos = array[i];
        let indice = i;
        numero = productos.count;
        let precioCantidad = productos.unitCost * numero;


        //preciototalproducto = producto.precio * producto.cantidad;
        if (productos.currency === "USD") {

            listaProductos += `
            <tr>
                <td><img src=${productos.src}></td>
                <td>${productos.name}</td>
                <td>${productos.unitCost}USD</td>
                <td><input type="number" class="form-control" id="contador" placeholder="" value=${numero} min="0"></td>
                <td id="cambiar">${precioCantidad}USD</td>
                <td><button class="btn btn-danger" onclick="borrarTabla(${indice})">Borrar</button></td>
            </tr>
            `;
        } else {

            listaProductos += `
            <tr>
                <td><img src=${productos.src}></td>
                <td>${productos.name}</td>
                <td>USD${productos.unitCost/40}</td>
                <td><input type="number" class="form-control" id="contador2" placeholder="" value=${numero} min="0"></td>
                <td id="cambiar2">${precioCantidad/40}USD</td>
                <td><button class="btn btn-danger" onclick="borrarTabla(${indice})">Borrar</button></td>
            </tr>
            
            `;
        }


    };


    //precio total de los articulos
    /*for (i = 0; i < array.length; i++) {
        let producto = array[i];
        if (producto.currency === "USD") {
            let precioCantidad = producto.unitCost * producto.count;
            listaPrueba += precioCantidad;
        } else {
            let precioCantidad = (producto.unitCost / 40) * producto.count;
            listaPrueba += precioCantidad;
        }

    };
*/

    //listaProductos += `<td></td>`;
    document.getElementById("lista").innerHTML = listaProductos;
    mostrarSubtotal();
    document.getElementById("cuenta2").innerHTML = 0;
    document.getElementById("total").innerHTML = 0;

    document.getElementById("contador").addEventListener("change", function() {
        for (i = 0; i < array.length; i++) {
            toma1 = array[1];

            numero = this.value;

            precioCantidad = toma1.unitCost * numero;

            document.getElementById("cambiar").innerHTML = precioCantidad + "USD";

            mostrarSubtotal();
        }
    });

    document.getElementById("contador2").addEventListener("change", function() {
        for (i = 0; i < array.length; i++) {
            toma2 = array[0];
            numero = this.value;

            precioCantidad2 = (toma2.unitCost / 40) * numero;

            document.getElementById("cambiar2").innerHTML = precioCantidad2 + "USD";
            mostrarSubtotal();
        }
    });


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


function borrarTabla(numeroIndice) {

    informa["articles"].splice(numeroIndice, 1);
    mostrar(informa["articles"]);

}

function mostrarSubtotal() {

    let tomarArticulos = 0;
    tomarArticulos += parseFloat(document.getElementById("cambiar").innerHTML);
    tomarArticulos += parseFloat(document.getElementById("cambiar2").innerHTML);
    let tomarID = document.getElementById("cuenta");
    tomarID.innerHTML = tomarArticulos;


}

function calculoTotal() {

    let tomarCuentas = 0;
    let tomarTotal = document.getElementById("total");
    tomarCuentas += parseFloat(document.getElementById("cuenta").innerHTML);
    tomarCuentas += parseFloat(document.getElementById("cuenta2").innerHTML);
    tomarTotal.innerHTML = tomarCuentas;
}

document.getElementById("tarjetacredito").addEventListener("change", function() {

    let barra = document.getElementById("elegirPago");
    let textoCredito = document.getElementById("textoelegir");
    textoCredito.innerHTML = "Elegiste pagar con tarjeta de credito";
    barra.innerHTML = `<button type="button" class="m-1 btn btn-primary" data-toggle="modal" data-target="#contidionsModal2">Cambiar metodo de pago</button>`;

});
document.getElementById("cuentabancaria").addEventListener("change", function() {

    let barra = document.getElementById("elegirPago");
    let textoCredito = document.getElementById("textoelegir");
    textoCredito.innerHTML = "Elegiste pagar con cuenta bancaria";
    barra.innerHTML = `<button type="button" class="m-1 btn btn-primary" data-toggle="modal" data-target="#contidionsModal2">Cambiar metodo de pago</button>`;

});

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