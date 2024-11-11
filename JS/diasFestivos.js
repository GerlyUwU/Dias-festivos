const API_URL_BASE = 'https://holidayapi.com/v1/';
const API_KEY = "e40f517f-fd67-4792-a56d-abf10e0c30a2";

var txt_anio;
var cbx_pais;
var cbx_mes;
var div_resultados;

window.onload = function () {
    txt_anio = document.getElementById('txt_anio');
    cbx_pais = document.getElementById('cbx_pais');
    cbx_mes = document.getElementById('cbx_mes');
    div_resultados = document.getElementById('div_resultados');
    //asigna de inicio el año anterior 
    txt_anio.value = (new Date().getFullYear() - 1);
    //Ocultamos el div de resultados 
    div_resultados.style.display = "none";
}


function consultar() {
    //oculta el div de resultados 
    div_resultados.style.display = "none";
    //crear peticion http 
    var request = new XMLHttpRequest();
    var URL_CONSULTA = API_URL_BASE + "holidays?" +
        "language=es" + "&key"
        + API_KEY + "&country=" + cbx_pais.value +
        "&year=" + txt_anio.value +
        "&month=" + cbx_mes.value;
    console.log(URL_CONSULTA);
    request.open('GET', URL_CONSULTA, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            var data = JSON.parse(this.response);
            console.log(data);
            mostrarDiasFestivos(data.holidays);

        } else {
            alert("no se puede conectar al servidor...");
        }
    }
    request.oneerror = function () {
        alert("el apykey solo permite consultar los dias " + "feriados del año inmediato anterior...");
    };

    request.send();
    return false;
}

function mostrarDiasFestivos(diasFestivos) {
    div_resultados.style.display = "block";
    div_resultados.innerHTML = "";
    let titulo = document.createElement('h2');
    titulo.innerHTML = "Dias Festivos de " + cbx_pais.options[cbx_pais.selectedIndex].text +
        " en " + cbx_mes.options[cbx_mes.selectedIndex].text + " del año  " + txt_anio.value;
        //la funcion appenchild permite añadir 1 elemento al final de un componente 
        div_resultadso.appendChild(titulo);
        let_tarjetas = " ";
        diasFestivos.forEach((diaFestivo) => {
            tarjetas += generarTarjeta(diaFestivo);
        });

        if(tarjetas !==  ""){
            tarjetas = '<div class="tarjetas">'+tarjetas+'</div>';
            div_resultados.insertAdjacentHTML("beforeend",tarjetas);
        }else{
            let mensaje = document.createElement('h3');
            mensaje.innerText = "No se encontraron dias feriados para este mes...";

            div_resultados.appendChild(mensaje);
        }
}

function generarTarjeta(datos){
    console.log(datos);
    return '<div class="tarjeta">'+
    '<h3>'+datos.name+'</h3>'+
    '<h4>'+datos.date+'</h4>'+
    '<br>'+
    ' '+datos.weekday.date.name+
    '</div>';
}