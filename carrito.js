class Producto{
    constructor(id, gusto, precio){
        this.id = id;
        this.gusto = gusto;
        this.precio = precio;
        this.cantidad = 1;
        this.precioTotal = precio;
    }
}

const agregarUnidad = (producto) => {
    producto.cantidad++;
}

const quitarUnidad = (producto) => {
    producto.cantidad--;
}

const actualizarPrecioTotal = (producto) => {
    producto.precioTotal = producto.precio * producto.cantidad;
}

let precioTotal;

const agregarProducto = (event) => {
    event.preventDefault();
    let producto = event.target;
    //console.log("precio: " + producto.getAttribute('precio'));

    let productoEnCarrito = JSON.parse(localStorage.getItem(producto.id));

    if (productoEnCarrito) {
        agregarUnidad(productoEnCarrito);
        actualizarPrecioTotal(productoEnCarrito);
    } else {
        productoEnCarrito = new Producto(producto.id, producto.getAttribute('gusto'), parseInt(producto.getAttribute('precio')));
    }
    
    localStorage.setItem(productoEnCarrito.id, JSON.stringify(productoEnCarrito));
    console.log(`Se ha añadido una unidad del producto ${productoEnCarrito.gusto} Unidades: ${productoEnCarrito.cantidad}`);

    Swal.fire({
        title: 'Genial',
        html: `Agregaste <strong>${productoEnCarrito.gusto}</strong> al carrito!`,
        icon: 'success'
      })

}

function obtenerPrecioTotal() {
    let precioTotal = 0;
    for (const producto of carrito) {
        precioTotal += producto.precioTotal;
    }

    return precioTotal;
}


const verCarrito = () => {
    let carrito = document.getElementById('carrito');
    if (carrito) {
        let productos = '';
        for (var i = 0; i < localStorage.length; i++){
            let producto = JSON.parse(localStorage.getItem(localStorage.key(i)));
            productos += (`<div>gusto: ${producto.gusto} cantidad: ${producto.cantidad} precio total: ${producto.precioTotal}</div>`);
        }
        carrito.innerHTML = productos;
    }
}


const botones = document.getElementsByClassName("btn-agregar");

for (let boton of botones) {
    //console.log(boton.id + " " + boton.getAttribute('precio'));
    boton.addEventListener("click", agregarProducto);
}

verCarrito();

