let informa = [];

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            informa = resultObj.data;


            document.getElementById("alerta").innerHTML = informa["articles"].length;
        }
    });

});