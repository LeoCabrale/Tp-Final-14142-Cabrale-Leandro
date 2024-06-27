let idCodes=[];
function tablaProductos()
{

    fetch('https://api.yumserver.com/14142/products')
    .then(response => response.json())
    .then(data => {
        mostrarDatos(data);
    })
    .catch(error => console.error('Error:', error));
}
function mostrarDatos(data)
{
    let html="";
    for(let i=0;i<data.length;i++)
{
idCodes[i]=data[i].idcod;
html=html+"<tr><td>"+data[i].idcod+"</td>"+
"<td>"+data[i].titulo+"</td>"+
"<td>"+data[i].precioPeso+"</td>"+
"<td>"+data[i].precioDolar+"</td>"+
"<td>"+data[i].fecha+"</td></tr>";

}
document.body.innerHTML+=
`
<table border="1">
<thead>    
<tr>
    <th>idCod</th>
    <th>Titulo</th>
    <th>Precio Pesos</th>
    <th>Precio Dolar</th>
    <th>Fecha</th>
</tr>
</thead>
<tbody>
${html}
 </tbody>    
</table>    
`;

}

function Alta()
{
    
    
    let titulo= document.getElementById("titulo1").value;
    let precioPeso=document.getElementById("PrecioPeso").value;
    let precioDolar= document.getElementById("PrecioDolar").value;
    let fecha=document.getElementById("Fecha1").value;
    fetch('https://api.yumserver.com/14142/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({titulo,precioPeso,precioDolar,fecha})
        })
        .then(response => swal("El producto se cargo con exito",{ icon: "success",}))
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
function formularioEdicion()
{
    fetch('https://api.yumserver.com/14142/products')
    .then(response => response.json())
    .then(data => {
        mostrarDatos(data);
    })
    .catch(error => console.error('Error:', error));



}
function modificarProducto()
{
    document.body.innerHTML+=
`
<div class="input-field">
<input type="text" id="idCodM">
<label>idCod a modificar</label>
</div>

<div class="input-field">
<input type="text" id="tituloM">
<label>Titulo nuevo</label>
</div>

<div class="input-field">
<input type="text" id="PrecioPesoM">
<label>Precio peso nuevo</label>
</div>

<div class="input-field">
<input type="text" id="PrecioDolarM">
<label>Precio dolar nuevo</label>
</div>

<div class="input-field">
<input type="text" id="FechaM">
<label>Nueva fecha</label>
</div>
<button class="btn" onclick="Modificar()">Modificar Producto</button>
`;
}

function Modificar()
{
let flag=false;
let idcod=document.getElementById("idCodM").value;
let titulo= document.getElementById("tituloM").value;
let precioPeso=document.getElementById("PrecioPesoM").value;
let precioDolar= document.getElementById("PrecioDolarM").value;
let fecha=document.getElementById("FechaM").value;    
for (let index = 0; index < idCodes.length; index++) 
{
    if(idCodes[index]==idcod)
        {
            flag=true;
        }    
    
}
if(flag==true)
{
fetch('https://api.yumserver.com/14142/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({idcod,titulo,precioPeso,precioDolar,fecha})
        })
        .then(response => swal("El producto se modifico con exito",{ icon: "success",}))
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
       
}
else
{
    alert("El id cod ingresado es inexistente, por favor ingrese nuevamente");
}
}
function eliminarProducto()
{
    document.body.innerHTML+=
    `
    <div class="input-field">
    <input type="text" id="idCodD">
    <label>idCod a eliminar</label>
    </div>
    <button class="btn" onclick="ConsultaBorrar()">Eliminar Producto</button>
    
    `;
    
}