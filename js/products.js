var categoriesArray = [];

function showCategoriesList(array) {

    let contenidoproductos = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        contenidoproductos += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + category.name + `</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                    </div>
                    <h6 class="mb-1">` + category.description + `</h6><br>
                    <h6 class="mb-1">` + category.cost + category.currency + `</h6>
                </div>
            </div>
        </div>
        `

        document.getElementById("contenedor").innerHTML = contenidoproductos;
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
            hideSpinner();
        }
    });
});