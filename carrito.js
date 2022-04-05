class Producto{
    constructor(id, gusto, precio){
        this.id = id;
        this.gusto = gusto;
        this.precio = precio;
        this.cantidad = 1;
        this.precioTotal = precio;
    }

    agregarUnidad(){
        this.cantidad++;
    }

    quitarUnidad(){
        this.cantidad--;
    }

    actualizarPrecioTotal(){
        this.precioTotal = this.precio * this.cantidad;
    }
}

let carrito = [];
let precioTotal;

const agregarProducto = (event) => {
    event.preventDefault();
    let producto = event.target;
    //console.log("precio: " + producto.getAttribute('precio'));

    let productoEnCarrito = carrito.find((elemento) => elemento.id == producto.id);
    
    if (productoEnCarrito) {
        let index = carrito.findIndex((elemento) => {
            if (elemento.id === producto.id) {
                return true;
            }
        });

        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
        console.log(`Se ha añadido otra unidad del producto ${carrito[index].gusto} Unidades: ${carrito[index].cantidad}`);
    } else {
        carrito.push(new Producto(producto.id, producto.getAttribute('gusto'), parseInt(producto.getAttribute('precio'))));
        console.log(`Se ha añadido al carrito el producto ${producto.getAttribute('gusto')}`);
    }

    document.getElementById('total').innerHTML = obtenerPrecioTotal();
    let productosEnCarrito = "";
    carrito.forEach(producto => productosEnCarrito += producto.gusto + " cantidad: " + producto.cantidad + "<br>");
    document.getElementById('carrito').innerHTML = productosEnCarrito

    console.table(carrito);
}

function obtenerPrecioTotal() {
    let precioTotal = 0;
    for (const producto of carrito) {
        precioTotal += producto.precioTotal;
    }

    return precioTotal;
}


const botones = document.getElementsByClassName("btn-agregar");

for (let boton of botones) {
    //console.log(boton.id + " " + boton.getAttribute('precio'));
    boton.addEventListener("click", agregarProducto);
}

