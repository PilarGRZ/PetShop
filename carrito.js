const carrito = document.querySelector('#carro');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('.listaProductos');
const precioTotal = document.querySelector('#precioTotal');
const cantidadProductos = document.querySelector('.contadorProductos')
let productosCarrito = [];
let totalProducto = 0;
let contadorProductos = 0;


eventListeners();


function eventListeners(){

    /*Agregar un curso presionando el botón agregar al carrito*/
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);


    /*LocalStorage */
    document.addEventListener('DOMContentLoaded', ()=>{

        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorProductos = JSON.parse(localStorage.getItem('contador'));
        totalProducto = JSON.parse(localStorage.getItem('total') || []);
   
       

        carritoHtml();
    });


    vaciarCarrito.addEventListener('click', ()=>{
        productosCarrito = [];
        totalProducto = 0;
        contadorProductos = 0;

   
        limpiarHtml(); 
    });

};


/*Funciones*/

function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains("btn")){
      const productoSeleccionado = e.target.parentElement.parentElement;

      leerDatosProducto(productoSeleccionado);

      
    };
};


function eliminarProducto(e){

    e.preventDefault();

    if(e.target.classList.contains("borrar-producto")){
        const productoId = e.target.getAttribute('data-id');


        productosCarrito.forEach(descontar => {
            
            if(descontar.id === productoId){
                let reducirTotal = parseFloat(descontar.precio) * parseFloat(descontar.cantidad);
                totalProducto = totalProducto - reducirTotal;
                totalProducto = totalProducto.toFixed(3);
             

            }
        });
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);

        contadorProductos--;
    }


    if (productosCarrito.length === 0) {
        precioTotal.innerHTML = 0;
        cantidadProductos.innerHTML = 0;


    }

    
        carritoHtml();
   

}

/*Lee el contenido del HTML al que le dimos click y extrae la información del curso*/

function leerDatosProducto(producto){

    console.log(producto);
    /*Objeto con el contenido del curso actual*/

    const infoProducto={
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.info-card p').textContent,
        precio: producto.querySelector('.precio p').textContent,
        id: producto.querySelector('.btn').getAttribute('data-id'),
        cantidad: 1,
    }



  totalProducto = parseFloat(totalProducto) + parseFloat(infoProducto.precio)
        totalProducto = totalProducto.toFixed(3);

   
    console.log(totalProducto);


        /*Revisar si ya existe el producto seleccionado en en carrito y sumarlo en la cantidad*/

        const existe = productosCarrito.some(producto => producto.id === infoProducto.id);
        if(existe){
    
            /*Actualizar la cantidad*/
    
            const productos = productosCarrito.map(producto=>{
                if(producto.id === infoProducto.id){
                    producto.cantidad++;
                    return producto;
                }
                else{
                    return producto;
                }
            });
    
            productosCarrito=[...productos];
        }
        else{

            productosCarrito =[...productosCarrito, infoProducto];
            contadorProductos++;
           
        }

    console.log(productosCarrito);
    carritoHtml();

};


/* Muestra el carrito de compras en el HTML*/

/*Recorre el carrito y genera el HTML*/

function carritoHtml(){
    limpiarHtml();

productosCarrito.forEach(producto=>{

    const {nombre, imagen, precio, id, cantidad} = producto;

    const row = document.createElement('tr');

    row.innerHTML=`
    <td><img src="${imagen}" width="100"></td>
    <td>${nombre}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td> <a href="#" class="borrar-producto" data-id="${id}">X</a>
    `;

    /*Agrega el HTML del carrito en tbody*/

    contenedorCarrito.appendChild(row);
    precioTotal.innerHTML = totalProducto;
    cantidadProductos.innerHTML = contadorProductos;
});

//* Agregar carrito de compras al storage*/

sincronizarStorage();
};


function sincronizarStorage(){

    localStorage.setItem('carrito', JSON.stringify(productosCarrito));

    localStorage.setItem('contador', JSON.stringify(contadorProductos));

    localStorage.setItem('total', JSON.stringify(totalProducto));

}


function limpiarHtml(){

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
};












