var currentTab=0;
var x=document.getElementsByClassName("tag");

//Usuario temporal
const user=["usuario21","admin1234"];

//Función que muestra las pestañas del formulario
function mostrar(n){
    x[n].style.display="block";
    if(n<=1){
        document.getElementById("btnAnt").style.display="none";
    }else{
        document.getElementById("btnAnt").style.display="inline";
    }
    if(n==(x.length-1)){
        document.getElementById("btnSig").innerHTML="Guardar";
        document.getElementById("vistaPrev").style.display="inline";
    }else{
        if (n==0){
            document.getElementById("btnSig").innerHTML="Ingresar";
        }else{
            document.getElementById("btnSig").innerHTML="Continuar";
        }
        document.getElementById("vistaPrev").style.display="none";
    }
    indicStep(n);
}
//Esconder mensaje error usuario
function refresh(){
    document.getElementById("usuario_incorrecto").style.visibility="hidden";
}
//Validación ingreso de datos en cajas de texto y usuario y contraseña
function validacion(){
    var y, i, valido=true;
    y=x[currentTab].getElementsByTagName("input");
    document.getElementById("mens_error").style.display="none";
    document.getElementById("usuario_incorrecto").style.visibility="hidden";
    for (i=0; i<y.length;i++){
        if (y[i].value==""){
            y[i].className+=" invalido";
            valido=false;
        }
    }
    switch(currentTab){
        case 0:
            valido=true;
            for (i=0; i<y.length;i++){
                if (y[i].value!=user[i]){
                    valido=false;
                }
            } 
            if(!valido){
                document.getElementById("usuario_incorrecto").style.visibility="visible";
                document.getElementById("usuario").value="";
                document.getElementById("password").value="";
            }
            break
        case 1:
            //Botones de selección tipo radio
            const radio=document.getElementsByName("actualizacion_menu");
            valido=false;
            for (i=0;i<radio.length;i++){
                if(radio[i].checked){
                    valido=true;
                }
            }
            if(!valido){document.getElementById("mens_error").style.display="block"}
            break
        case 2:
            //Datos del plato - Validación para selección de plato y caja de texto tipo textarea
            var sel=document.getElementById("lista_seleccion").selectedIndex;
            if(sel==0 || document.getElementById("descripcion").value==""){
                valido=false;
            }
            if(!valido){document.getElementById("mens_error").style.display="block"}
            break
        }
    return valido;
}

//Función a ejecutarse en los botones de atrás / siguiente
function btnPrev(n){
    if (n==1 && !validacion()) {return false} //Evaluación validación cuando se oprime el botón siguiente
    x[currentTab].style.display="none"; //Oculta pestaña actual
    currentTab=currentTab+n;
    if (currentTab>=x.length){
        //Función a ejecutar cuando se oprime el botón de siguiente en la última pestaña
        //Función provisional mientras base de datos ON
        document.getElementById("exito").style.display="inline";
        const prev=document.getElementsByClassName("button")[0];
        prev.style.display="none"; //Oculta los botones al final
        indicStep(currentTab);
        return false;
    }
    mostrar(currentTab);
}

//Función que indica la pestaña del formulario en la que se encuentra actualmente
function indicStep(n){
    var y=document.getElementsByClassName("step");
    var i;
    //Aplicación estilo base a todos los elementos de indicación de página
    for (i=0;i<y.length;i++){
        y[i].style.opacity=0.5;
    }
    if (n>=y.length){
        return false; //Salir de la función al pasar de la última pestaña del formulario
    }
    y[n].style.opacity=0.8; //Cambio de opacidad para indicar la pestaña actual
}

//Función de creación automática del número de indicadores que se requieran según el número de pestañas del formulario
function stepCreation(){
    var i;
    var cont=document.getElementById("indicador"); //Contenedor de los indicadores
    for (i=0;i<x.length;i++){
        var ind=document.createElement("SPAN"); //Creación nodo tipo span
        var att=document.createAttribute("class"); //Creación de nodo atributo tipo class
        att.value="step";
        ind.setAttributeNode(att); //Adición nodo atributo al nodo elemento
        cont.appendChild(ind); //Adición nodo span al div indicador
    }
}