
var nombre = "Oliver Alba";
var edad   = 18;
var sueldo = 1200

var suma = concatenacion = nombre + " " + edad;
document.write(concatenacion);

var datos = document.getElementById("datos");
datos.innerHTML =`
<h1> Sus datos </h1>
<h2> Nombre:  ${nombre} 
<h2> Edad: ${edad}
<h2> Sueldo: ${1200}
`;
if(sueldo <= 1100){
    datos.innerHTML += 'Sin errores';
}else(
    datos.innerHTML += 'Le queda saldo aún, sea paciente'
)