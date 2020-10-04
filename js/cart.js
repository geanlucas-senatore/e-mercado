var informa = [];


function mostrar(array) {
    listaProductos = '';
    listaPrueba = 0;

    for (let i = 0; i < array.length; i++) {
        let productos = array[i];
        let numero = productos.count;
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
            </tr>
            
            `;
        }

    };


    //precio total de los articulos
    for (i = 0; i < array.length; i++) {
        let producto = array[i];
        if (producto.currency === "USD") {
            let precioCantidad = producto.unitCost * producto.count;
            listaPrueba += precioCantidad;
        } else {
            let precioCantidad = (producto.unitCost / 40) * producto.count;
            listaPrueba += precioCantidad;
        }

    };


    //listaProductos += `<td></td>`;
    document.getElementById("lista").innerHTML = listaProductos;
    document.getElementById("mostrar").innerHTML = listaPrueba;

    //ver();
    document.getElementById("contador").addEventListener("change", function() {
        for (i = 0; i < array.length; i++) {
            toma1 = array[1];
            numero = this.value;
            precioCantidad = toma1.unitCost * numero;
            document.getElementById("cambiar").innerHTML = precioCantidad + "USD";
        }
    });

    document.getElementById("contador2").addEventListener("change", function() {
        for (i = 0; i < array.length; i++) {
            toma2 = array[0];
            numero = this.value;
            precioCantidad2 = (toma2.unitCost / 40) * numero;
            document.getElementById("cambiar2").innerHTML = precioCantidad2 + "USD";

        }
    });

}

/*function ver() {

    let tomar = document.getElementById("contador");
    let tomarID = document.getElementById("hola");
    tomarID.innerHTML = "chau";

*/

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            informa = resultObj.data;

            mostrar(informa["articles"]);

        }
    });


});