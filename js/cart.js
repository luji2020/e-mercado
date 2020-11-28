// Función que muestra el pino del js 

function mostrarLista(array) {
    let html = ``;
    for (i = 0; i < array.length; i++) {
        article = array[i];
        subtotal = article.unitCost * article.count; // Artículo precio unitario x cantidad
        html += `
    <tr>
  <td class="align-middle"><img style='height:4em' src='${article.src}' alt='${article.src}' class="img-thumbnail"></td>
  <td class="align-middle">${article.name}</td>
  <th class="align-middle"><input type="number" id="num1" style="width: 90px;" class="form-control" placeholder="0" value="${article.count}"/><br/ > </th>
  <td class="align-middle"><span>${article.currency} ${article.unitCost}</span> </td>
  <td class="align-middle" id="resultados">${article.currency} ${subtotal} </td>
  </tr>
    `
    }
    document.getElementById("lista").innerHTML = html; // Muestra la lista en html
    document.getElementById("count").innerHTML = array.length; // Tira info al badge de cant art
}

// Función para obtener sub total 
function operaciones(op) {
    var ops = {
        multiplicar: function multiplicarNumeros(n1, n2) {
            return (parseInt(n1) * parseInt(n2));
        }

    };

    var num1 = document.getElementById("num1").value; // Número de cant de artículos
    var num2 = 100; // Número de precio unitario


    // Comprobamos si se ha introducido números en la casilla num1
    if (isNaN(parseFloat(document.getElementById('num1').value))) {
        document.getElementById('resultados').innerHTML = "<span> Cantidad debe ser mayor que 0.</span>";
        document.getElementById("num1").innerText = "0";
        document.getElementById("num1").focus();
    }
    else {
        // Sí se han introducido los números, da el resultado:
        switch (op) {

            case 'multiplicar':
                var resultados = ops.multiplicar(num1, num2);
                document.getElementById('resultados').innerHTML = ` UYU` + " " + resultados;
                document.getElementById('resultados').innerHTML = html;
                break;
        }
    }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            var articles = resultObj.data.articles
            mostrarLista(articles);

        }
    });
});


let productCost = 0;
let productCount = 0;
let percentage = 0.15;
let MONEY_SYMBOL = "$";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let SUCCESS_MSG = "¡Ha realizado la compra con éxito!";
let ERROR_MSG = "Ha habido un error, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de compra
function updateTotalCosts() {
    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let unitCostToShow = PESO_SYMBOL + productCost;
    let comissionToShow = Math.round((percentage * 100)) + PERCENTAGE_SYMBOL;
    let totalCostToShow = PESO_SYMBOL + (Math.round(productCost) + (productCost * percentage));

    unitProductCostHTML.innerHTML = unitCostToShow;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("productCountInput").addEventListener("change", function () {
        productCount = this.value;
        updateTotalCosts();
    });

    document.getElementById("productCostInput").addEventListener("change", function () {
        productCost = this.value;
        updateTotalCosts();
    });

    document.getElementById("goldradio").addEventListener("change", function () {
        percentage = 0.15;
        updateTotalCosts();
    });

    document.getElementById("premiumradio").addEventListener("change", function () {
        percentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function () {
        percentage = 0.05;
        updateTotalCosts();
    });



    //Se obtiene el formulario de los productos a comprar
    var sellForm = document.getElementById("sell-info");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'COMPRAR'.
    sellForm.addEventListener("submit", function (e) {

        let productNameInput = document.getElementById("productName");
        let productCategory = document.getElementById("productCategory");
        let productCost = document.getElementById("productCostInput");
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        productNameInput.classList.remove('is-invalid');
        productCategory.classList.remove('is-invalid');
        productCost.classList.remove('is-invalid');

        //controla que se haya ingresado dirección.
        if (productNameInput.value === "") {
            productNameInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por la categoría departamento
        if (productCategory.value === "") {
            productCategory.classList.add('is-invalid');
            infoMissing = true;
        }


        if (!infoMissing) {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud de compra.

            getJSONData(PUBLISH_PRODUCT_URL).then(function (resultObj) {
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "Ha realizado la compra con éxito";

                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok') {
                    msgToShow = SUCCESS_MSG;
                    document.getElementById("alertResult").classList.add('alert-success');
                }
                else if (resultObj.status === 'error') {
                    msgToShow = ERROR_MSG;
                    document.getElementById("alertResult").classList.add('alert-danger');
                }

                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("alertResult").classList.add("show");
            });
        }

        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
        return false;
    });
});


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            var articles = resultObj.data.articles
            mostrarLista(articles);
            mostrarTotal(articles);
        }
    });
});