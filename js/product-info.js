var category = {};
var coments = [];

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showImages(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
                <img src="` + imageSrc + `" alt="">
            
        `

        document.getElementById("product").innerHTML = htmlContentToAppend;
    }
}

function mostrarfiltros(array) {

    let htmlContentToAppend = "";
    let estrellas = '<span class="fa fa-star checked"></span>';
    for (let i = 0; i < array.length; i++) {
        let productos = array[i];


        htmlContentToAppend += `
        <div class="card" style="width: 50rem;">
        <div class="card-body">
        <h5 class="card-title">Calificacion: ` + estrellas.repeat(productos.score) + ` de 5</h5>
            <h5 class="card-title">` + productos.user + `</h5>
            <p class="card-text">` + productos.description + `</p>
            <small>posteado el: ` + productos.dateTime + `</small>
        </div>
    </div>
    <br>
            `

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data;

            let nombreauto = document.getElementById("nombre");
            let descriauto = document.getElementById("descri");
            let costoauto = document.getElementById("costo");

            nombreauto.innerHTML = category.name;
            descriauto.innerHTML = category.description;
            costoauto.innerHTML = "Precio:  " + category.cost + category.currency + ".  Cantidad de vendidos en 2020:  " + category.soldCount + "  vehiculos.";



            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
            showImages(category.images);
        }
    });
});
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            coments = resultObj.data;


            mostrarfiltros(coments);

            //Muestro las imagenes en forma de galería
        }
    });
});


$(function() {
    $('.pop').on('click', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');
    });
});