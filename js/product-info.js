var category = {};
var coments = [];
var products = [];
var related = [];
let informa = [];

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
                <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt=""> 
                </div>
        `

        document.getElementById("product2").innerHTML = htmlContentToAppend;
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
        <h5 class="card-title">Calificacion: ` + estrellas.repeat(productos.score) + `</h5>
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

function hora() {
    var objToday = new Date(),
        weekday = new Array('Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'),
        dayOfWeek = weekday[objToday.getDay()],
        domEnder = function() {
            var a = objToday;
            if (/1/.test(parseInt((a + "").charAt(0)))) return "";
            a = parseInt((a + "").charAt(1));
            return 1 == a ? "ro" : 2 == a ? "do" : 3 == a ? "ro" : ""
        }(),
        dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
        months = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dciembre'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear(),
        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
        curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear + " " + curHour + ":" + curMinute + "." + curSeconds + curMeridiem;

    document.getElementById("hora").innerHTML = "posteado el: " + today;
}

function recargar() {
    let contenidoNuevo = "";
    let stars = `<span class="fa fa-star checked"></span>`;
    let numero = localStorage.getItem("numero");
    let comenta = document.getElementById("comentario").value;

    contenidoNuevo += `
    <div class="card" style="width: 50rem;">
    <div class="card-body">
    <h5 class="card-title">` + stars.repeat(numero) + `</h5>
        <h5 class="card-title">` + codigo + `</h5>
        <p class="card-text">` + comenta + `</p>
        <small id="hora"></small>
    </div>
</div>
<br>`

    if (comenta !== "" && numero !== null) {
        document.getElementById("dondevaelcomentario").innerHTML += contenidoNuevo;
        hora();
    }

    localStorage.removeItem("numero");
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
            let imagenAuto = document.getElementById("product");

            nombreauto.innerHTML = category.name;
            descriauto.innerHTML = category.description;
            costoauto.innerHTML = "Precio:  " + category.cost + category.currency + ".  Cantidad de vendidos en 2020:  " + category.soldCount + "  vehiculos.";
            imagenAuto.innerHTML = `<img src="` + category.images[0] + `" class="d-block w-100" alt="">`
                //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
            showImages(category.images);
        }
        getJSONData(PRODUCTS_URL).then(function(resultado) {
            if (resultado.status === "ok") {

                related = resultado.data;


                let contentTo = "";

                category.relatedProducts.forEach(function(elemento, indice) {


                    contentTo += `
                    
                    <div class="col-md-4">
                    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top" src=` + related[elemento].imgSrc + `>
                    <hr>
                    <h3 class="m-3">` + related[elemento].name + `</h3>
                    <div class="card-body">
                        <p class="card-text">` + related[elemento].description + `</p>
                        <button class="btn btn-primary">Ver</button>
                    </div>
                    </a>
                    </div>
       


                    `

                    document.getElementById("poner").innerHTML = contentTo;

                });

            }
        });
    });
});
//${related[elemento].name}
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            coments = resultObj.data;



            mostrarfiltros(coments);


        }
    });
    getJSONData(CART_INFO2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            informa = resultObj.data;


            document.getElementById("alerta").innerHTML = informa["articles"].length;
        }
    });
});
$(function() {
    $('.pop').on('click', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');
    });
});