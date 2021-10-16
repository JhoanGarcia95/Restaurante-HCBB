var currentTab=0;
var x=document.getElementsByClassName("tag");
var indice_previa=0;

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
    var radio=document.getElementsByName("actualizacion_menu"); //Variable botones tipo radio
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
            valido=false;
            for (i=0;i<radio.length;i++){
                if(radio[i].checked){
                    valido=true;
                }
            }
            if(!valido){document.getElementById("mens_error").style.display="block"}
            //Acivación entrada nombre del plato o lista de selección según botón radio activo siguiente página
            var selec_plato=document.getElementsByClassName("platos");
            for (i=0;i<selec_plato.length;i++){
                selec_plato[i].style.display="none";
            }
            if(radio[0].checked){
                selec_plato[0].style.display="block";
            }else{
                selec_plato[1].style.display="block";
            }
            break
        case 2:
            //Datos del plato - Validación para selección de plato y cajas de texto tipo textarea
            var sel=document.getElementById("lista_seleccion").selectedIndex;
            //Ajuste validación según la opción radio seleccionada
            //Eliminación validación incorrecta para entrada de nombre del plato si la opción selec. fue actualizar un plato
            if(radio[1].checked){
                document.getElementById("nuevo_nombre").className-=" invalido";
                valido=true;
                if(sel==0){
                    valido=false;
                }//Validación selección del plato
            }
            //Validación entradas tipo textarea
            const area=document.getElementsByTagName("textarea");
            if(area[0].value==""){
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
    else{
        document.getElementById("mens_error").style.display="none";
        document.getElementById("column").style.display="none";
    }
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

//Función de vista previa del plato creado/modificado
function previa(){
    var validar=validacion();
    if (validar){
        if (indice_previa==0){
            document.getElementById("column").style.display="inline";
            //Retorno datos suministrados por el usuario para creación de vista previa
            //1. Revisión botón radio seleccionado -> variable radio ya creada antes
            var radio=document.getElementsByName("actualizacion_menu"); //Variable botones tipo radio;
            const titulo=document.getElementById("nombre_plato_prev");
            if(radio[0].checked){
                titulo.innerHTML=document.getElementById("nuevo_nombre").value;//Asignación del nuevo nombre
            }else if(radio[1].checked){
                //Revisión opción seleccionada de la lista de selección de platos y asignación del nombre a la vista previa
                const opt=document.getElementsByTagName("option");
                for (i=0;i<opt.length;i++){
                    if (opt[i].selected){
                        titulo.innerHTML=opt[i].innerHTML;
                        break;
                    }
                }
            }

            //Descripción del plato
            document.getElementById("descripcion_plato_prev").innerHTML=document.getElementById("descripcion").value;
            //Ingredientes del plato
            document.getElementById("ingredientes_prev").innerHTML+=document.getElementById("ingredientes").value;
            
            //Previsualización imagen cargada - Tomado de:
            //developer.mozilla.org/es/docs/Web/API/FileReader/readAsDataURL
            var preview=document.getElementById("img_plato_prev");
            var file=document.querySelector("input[type=file]").files[0];
            //Creación objeto clase FileReader
            var reader=new FileReader();

            reader.onloadend=function(){
                preview.src=reader.result; //Asignación ruta URL de la imagen cargada al elemento img de la vista previa
            }
            if(file){//Revisión si hay archivo cargado para asignación URL
                reader.readAsDataURL(file);
            }else{
                preview.src="";
            }         

            indice_previa=1;
        }else{
            document.getElementById("column").style.display="none";
            indice_previa=0;
        }
    }else{
        document.getElementById("mens_error").style.display="block"; 
    }
    
    
}