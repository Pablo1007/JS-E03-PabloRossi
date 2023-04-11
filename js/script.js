class producto {
    constructor(id, nombre, categoria, precio, img) {
      this.id = id,
      this.nombre = nombre,
      this.categoria = categoria,
      this.precio = precio,
      this.img = img;
    }
  }

//   CREACION DE ARRAY DE OBJETOS DE BEBIDAS

  const bebidas = [];
  let carrito = [];
  bebidas.push(new producto(1, "Lata Stella Artois", "cerveza", 300,"../assets/images/Productos/lata-stella.jpeg"));
  bebidas.push(new producto(2, "fernet Branca", "aperitivo", 2000, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  bebidas.push(new producto(3, "Lata coca-cola", "gaseosa", 400, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  bebidas.push(new producto(4, "Lata Fanta", "gaseosa", 300, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  bebidas.push(new producto(5, "Lata Andes", "cerveza", 250, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  bebidas.push(new producto(6, "Gin salvaje", "aperitivo", 3000, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  bebidas.push(new producto(7, "Lata Sprite", "gaseosa", 350, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  bebidas.push(new producto(8, "Lata Temple", "cerveza", 400, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  bebidas.push(new producto(9, "Campari", "aperitivo", 1500, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  bebidas.push(new producto(10, "Jameson", "Whiskey", 4000, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  
  renderizar(bebidas)
  
//   RENDERIZADO DE ARRAY DE PRODUCTOS

    function renderizar(arrayProductos) {
        let productos = document.getElementById("productos")
        productos.innerHTML=""
        arrayProductos.forEach(array => {
            let tarjetaProducto = document.createElement("div")
            tarjetaProducto.className = "tarjetaProducto col-2 d-flex flex-column align-items-center justify-content-center shadow"
            tarjetaProducto.innerHTML += 
            `<img src=${array.img} alt="${array.nombre}" height="100px" width="auto">
            <h2 class=tituloProducto >${array.nombre}</h2>
            <h3 class=precioProducto >${array.precio} $</h3>
            <input class="botonProducto" id="${array.id}" type="button" value="Agregar al carrito">
            `
            productos.appendChild(tarjetaProducto)
            let boton = document.getElementById(array.id)
            boton.addEventListener("click",agregar)
        })
    }

    
    // BARRA DE BUSQUEDA DE PRODUCTOS
    
    let buscador = document.getElementById("buscador")
    let buscar = document.getElementById("buscar")
    buscar.addEventListener("click", filtrar)
    function filtrar() {
        let arrayFiltrado = bebidas.filter(producto => producto.nombre.includes(buscador.value))
        renderizar(arrayFiltrado)
    }

    // AGREGADO DE PRODUCTOS AL CARRITO
    
    function agregarCarrito(e) {
        let buscado = bebidas.find(producto => producto.id == e.target.id)
        if(carrito.some(bebida => bebida.id == buscado.id)){
            let pos = carrito

        }else{

        }
        carrito.push(buscado)
    }
    
    // guardado de carrito en JSON
    
    
    
    
    

    // recuperado de carrito de json

    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    
    




    