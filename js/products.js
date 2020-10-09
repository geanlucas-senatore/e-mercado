const ORDER_ASC_BY_PRICE = "$MAX";
const ORDER_DESC_BY_PRICE = "$MIN";
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_BY_SOLD_COUNT = "Vend."
currentArray = [];
currentcomordenarlos = undefined;
minCount = undefined;
maxCount = undefined;
let informa = [];

function ordenar(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function(a, b) {
            return a.cost - b.cost;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function(a, b) {
            return b.cost - a.cost;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function mostrarproductos() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentArray.length; i++) {
        let productos = currentArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(productos.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.soldCount) <= maxCount))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h3 class="mb-1">` + productos.name + `</h3>
                            <h5 class="text-muted">` + productos.soldCount + ` artículos</h5>
                        </div>
                        <h4 class="mb-1">` + productos.description + `</h4>
                        <br><br><br>
                        <h4 class="mb-1">Precio:&nbsp` + productos.cost + productos.currency + `</h4>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("contenedor").innerHTML = htmlContentToAppend;
    }
}

function mostrarfiltros() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentArray.length; i++) {
        let productos = currentArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(productos.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.cost) <= maxCount))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h3 class="mb-1">` + productos.name + `</h3>
                            <h5 class="text-muted">` + productos.soldCount + ` artículos</h5>
                        </div>
                        <h4 class="mb-1">` + productos.description + `</h4>
                        <br><br><br>
                        <h4 class="mb-1">Precio:&nbsp` + productos.cost + productos.currency + `</h4>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("contenedor").innerHTML = htmlContentToAppend;
    }
}

function ordenarymostrarcategorias(comordenarlos, array) {
    currentcomordenarlos = comordenarlos;

    if (array != undefined) {
        currentArray = array;
    }

    currentArray = ordenar(currentcomordenarlos, currentArray);

    //Muestro las categorías ordenadas
    mostrarproductos();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            ordenarymostrarcategorias(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
    document.getElementById("sortporpreciomin").addEventListener("click", function() {
        ordenarymostrarcategorias(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortporpreciomax").addEventListener("click", function() {
        ordenarymostrarcategorias(ORDER_DESC_BY_PRICE);
    });
    document.getElementById("sortporventas").addEventListener("click", function() {
        ordenarymostrarcategorias(ORDER_BY_SOLD_COUNT);
    });
    document.getElementById("limpiarfiltrodeprecios").addEventListener("click", function() {
        document.getElementById("filtrominimo").value = "";
        document.getElementById("filtromaximo").value = "";

        minCount = undefined;
        maxCount = undefined;

        mostrarproductos();
    });
    document.getElementById("filtradodeprecios").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("filtrominimo").value;
        maxCount = document.getElementById("filtromaximo").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        mostrarfiltros();
    });
    getJSONData(CART_INFO2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            informa = resultObj.data;

            document.getElementById("alerta").innerHTML = informa["articles"].length;
        }
    });
});