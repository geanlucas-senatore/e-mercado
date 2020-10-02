var informa = [];


function mostrar(array) {

    listaProductos = '';
    //precioTotal = 0;

    for (let i = 0; i < array.length; i++) {
        let productos = array[i];
        let toma1 = array[0];
        let toma2 = array[1];
        let precioCantidad = productos.unitCost * productos.count;
        let subtotal = ((toma1.unitCost * toma1.count) / 40) + toma2.unitCost * toma2.count;
        //preciototalproducto = producto.precio * producto.cantidad;
        if (productos.currency === "USD") {

            listaProductos += `
            <tr>
                <td><img src=${productos.src}></td>
                <td>${productos.name}</td>
                <td>${productos.unitCost}USD</td>
                <td><input type="number" class="form-control" id="contador" placeholder="" value=${productos.count} min="0"></td>
                <td> ${precioCantidad}USD</td>
            </tr>
            <tr>
                <td style="align:right;" colspan="5">costo de todos los productos: $${subtotal}USD</td>
            </tr>
            `;
        } else {

            listaProductos += `
            <tr>
                <td><img src=${productos.src}></td>
                <td>${productos.name}</td>
                <td>USD${productos.unitCost/40}</td>
                <td><input type="number" class="form-control" id="contador2" placeholder="" value=${productos.count} min="0"></td>
                <td>${precioCantidad/40}USD</td>
            </tr>
            
            `;
        }
    };


    //listaProductos += `<td></td>`;
    document.getElementById("lista").innerHTML = listaProductos;
    //ver();
}

/*function ver() {

    //let tomar = document.getElementById("contador");
    let tomarID = document.getElementById("hola");
    tomarID.innerHTML = "chau";

}
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
    //ver();

});