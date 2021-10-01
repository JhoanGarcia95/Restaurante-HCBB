//Función para mostrar la página del formulario correcta
var currentPag=0;
mostrarPag(currentPag);

function mostrarPag(n){
    //Lista con las páginas del formulario
    var x=document.getElementsByClassName("pag");
    //Mostrar página
    x[n].style.display="block";
    //Ajuste funcionamiento y contenido de los botones
    if(n==0){
        document.getElementById("atras").style.display="none";
    }else{
        document.getElementById("atras").style.display="inline";
    }
    if (n==(x.length-1)){
        document.getElementById("siguiente").style.innerHTML="Guardar";
    }else{
        document.getElementById("siguiente").style.display="Continuar";
    }
    //Ejecutar función para mostrar indicador correcto de página
    indicadorPag(n)
}

//Función indicador página
function indicadorPag(n){
    //Remoción clase "activa" de todos los step
    var i, x=document.getElementsByClassName("step");
    for(i=0;i<x.length;i++){
        x[i].className=x[i].className.replace(" active","");
    }
    //Agrgar clase "active" al step actual
    x[n].className+=" active";
}

//Función para funcionamiento de los botones atrás/siguiente
function nextPag(n){
    var x=document.getElementsByClassName("pag");
    //Salir de la función si cualquier campo de la pestaña actual es inválido
    if (n==1 && !validarForm()) return false; //si valid==true no entra en condicional
    //Esconder página actual
    x[currentPag].style.display="none";
    //Incremento o decremento indicador de página actual
    currentPag+=n;
    //Si se alcanza el final del formulario
    if(currentPag>=x.length){
        document.getElementById("modificacion_menu").onsubmit();
        return false; //Salida función
    }
    mostrarPag(currentPag);
}

//Validación campos válidos formulario
function validarForm(){
    var x, y, i, valid=true;
    x=document.getElementsByClassName("pag");
    y=x[currentPag].getElementsByClassName("input");
    //Ciclo para revisión de cada uno de los campos
    for (i=0;i<y.length;i++){
        if (y[i].value==""){
            //Agragar clase inválida al campo
            y[i].className+=" invalid";
            valid=false;
        }
    }
    //Si valid es true, step finalizado
    if(valid){
        document.getElementsByClassName("step")[currentPag].className+=" finish";
    }
    return valid; //Devuelve el status valid
}