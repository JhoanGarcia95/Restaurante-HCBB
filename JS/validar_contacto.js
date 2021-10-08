function validarContacto() {
  var nombre, apellido, telefono, correo, mensaje, validacion=true;
  nombre= document.getElementById("nombre").value;
  apellido= document.getElementById("apellido").value;
  telefono= document.getElementById("telefono").value;
  correo= document.getElementById("correo").value;
  mensaje= document.getElementById("mensaje").value;

  if (nombre == "") {
    alert("El campo nombre está vacío. Por favor escriba su nombre.");
    validacion= false;
  }
  else if (apellido == ""){
    alert("El campo apellido está vacío. Por favor escriba su apellido.");
    validacion= false;
  }
  else if (telefono == ""){
    alert("El campo telefono está vacío. Por favor escriba un número telefónico para contactarlo.");
    validacion= false;
  }
  else if (isNaN(telefono)){
    alert("Ingrese un número telefónico válido.");
    validacion= false;
  }
  //  else if(telefono.length <=10){
   //     alert("Verifica si el número telefónico contiene entre 7 a 10 dígitos.");
   // return false;
  //}
  else if (correo == ""){
    alert("El campo correo está vacío.Por favor escriba un correo electrónico para contactarlo.");
    validacion= false;
  }
  else if(mensaje == ""){
    alert("El campo mensaje está vacío. Permítanos conocer tu solicitud.");
    validacion= false;
  }  
  return validacion;
}
function pagEnvio(){
  if (validarContacto()){
    window.open("Pag_confirmado_envio.html","_self");
    document.getElementById("regForm").onsubmit();
  }
}