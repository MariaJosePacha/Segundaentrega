const socket = io(); 
//La instancia de Socket.io del lado del cliente. 


//Lo que tengo que hacer es escuchar al Backend, que este me va a mandar los productos: 

socket.on("productos", (data) => {
    renderProductos(data);
})

// Función para renderizar nuestros productos

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos"); 
    contenedorProductos.innerHTML ="";

    productos.forEach( item => {
        const card = document.createElement("div"); 
        card.classList.add("card"); 

        card.innerHTML = `
                            <p> ${item.id} </p>
                            <p> ${item.title} </p>
                            <p> ${item.price} </p>
                            <button> Eliminar </button>
                         `
        contenedorProductos.appendChild(card);
        //Evento para eliminar productos: 
        card.querySelector("button").addEventListener("click", () => {
            eliminarProductos(item.id); 
        })
    })
}

const eliminarProductos = (id) => {
    socket.emit("eliminarProducto", id);
}

//Agregamos productos del formulario: 
document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto(); 
})

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    }
    socket.emit("agregarProducto", producto); 
}