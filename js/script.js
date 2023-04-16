// USUARIO DE LA PAGINA

    localStorage.setItem("usuarioBD", "pabloRossi")

// CONTRASEÑA DE LA PAGINA

    localStorage.setItem("contraseñaBD", "pabloRossi123")

//constructor de productos

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
  bebidas.push(new producto(10, "Jameson", "whiskey", 4000, "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/340341-3359c763f08b338b2b15680466868435-640-0.webp"));
  
  mostrarProductos(bebidas)
  
//   incio de sesion para poder ver los productos
  
  let usuarioIngresado = document.getElementById("usuario")
  let contraseñaIngresada = document.getElementById("contraseña")
  let ingresar = document.getElementById("iniciarSesion")
  let ingresado = document.getElementById("ingresado")
  let inicio = document.getElementById("inicio")

  ingresar.addEventListener("click" , probar)
  
  function probar() {
    console.log(usuarioIngresado.value)
    console.log(contraseñaIngresada.value)

      if(usuarioIngresado.value == localStorage.getItem("usuarioBD")){
          if(contraseñaIngresada.value == localStorage.getItem("contraseñaBD")){
              alert("Bienvenido " + usuarioIngresado.value)
              ingresado.classList.remove("ocultar")
              inicio.classList.add("ocultar")
              document.getElementById("main").classList.remove("construccion")
            }else{
                alert("Contraseña incorrecta")
            }
        }else{
            alert("Usuario inexistente")
        }
    }
    
    // logica para poder ver el carrito de compras

    let botonCarrito = document.getElementById("botonCarrito")
    let carritoDiv = document.getElementById("carritoDiv")
    botonCarrito.addEventListener("click" , verCarrito)

    function verCarrito() {
        if(carritoDiv.classList.contains("ocultar")){
            carritoDiv.classList.remove("ocultar")
        }else{
            carritoDiv.classList.add("ocultar")
        }     
    }
    
  // recuperado de carrito de json
  
  if(localStorage.getItem("carritoGuardado")){
      carrito = JSON.parse(localStorage.getItem("carritoGuardado"))
      mostrarCarrito(carrito)
    }
    
    // filtrado por inputs
    
    let checks = document.getElementsByClassName("input")
    
    for (const check of checks) {
        check.addEventListener("click" , filtradoCheck)
    }
    
    function filtradoCheck(e) {
        // que filtros debe aplicar
        let filtros = []
        let filtradoCheck = []
        let sinFiltro = true
        for (const check of checks) {
            if(check.checked){
                filtros.push(check.id)
                sinFiltro = false
            }
        }
        //creacion de array filtrado
        filtradoCheck = bebidas.filter(productos => filtros.includes(productos.categoria))
        //si no hay filtro muestra todo el array completo
        if(sinFiltro){
            filtradoCheck = bebidas
        }
        // muestreo de array filtrado
        mostrarProductos(filtradoCheck)
        return(filtradoCheck)
    }
    
    //   RENDERIZADO DE ARRAY DE PRODUCTOS
    
    function mostrarProductos(arrayProductos) {
        let productos = document.getElementById("productos")
        productos.innerHTML = ""
        arrayProductos.forEach(array => {
            productos.innerHTML += 
            `<div class="tarjetaProducto col-2 d-flex flex-column align-items-center justify-content-center shadow">
                <img src="${array.img}" alt="${array.nombre}" height="100px" width="auto">
                <h2 class="tituloProducto" >${array.nombre}</h2>
                <h3 class="precioProducto" >${array.precio} $</h3>
                <input class="botonProducto" id="${array.id}" type="button" value="Agregar al carrito">
            </div>`
        })

        // boton de agregado de carrito

        arrayProductos.forEach(array => {
            let boton = document.getElementById(array.id)
            boton.addEventListener("click" , agregarCarrito)
        })

    }
    
    // BARRA DE BUSQUEDA DE PRODUCTOS
    
    let barraBuscador = document.getElementById("barraBuscador")
    let botonBuscar = document.getElementById("botonBuscar")
    botonBuscar.addEventListener("click", filtro)
    function filtro() {
        console.log()
        let bebidaFiltrada = filtradoCheck().filter(producto => producto.nombre.toLowerCase().includes(barraBuscador.value.toLowerCase()))
        mostrarProductos(bebidaFiltrada)
    }

    // AGREGADO DE PRODUCTOS AL CARRITO
    
    function agregarCarrito(e) {
        let productoBuscado = bebidas.find(producto => producto.id == e.target.id)
        if(carrito.some(bebida => bebida.id == productoBuscado.id)){
            let posicion = carrito.findIndex(bebida => bebida.id == productoBuscado.id)
            carrito[posicion].unidades = carrito[posicion].unidades + 1
            carrito[posicion].subtotal = carrito[posicion].precio * carrito[posicion].unidades
        }else{
            carrito.push({
                id: productoBuscado.id,
                nombre: productoBuscado.nombre,
                precio: productoBuscado.precio,
                unidades: 1,
                subtotal: productoBuscado.precio
            })
        }
        localStorage.setItem("carritoGuardado",JSON.stringify(carrito))
        mostrarCarrito(carrito)
    }
    
    // guardado de carrito en JSON
    
    
    function mostrarCarrito(arrayCarrito) {
        let muestraCarrito = document.getElementById("carrito")
        muestraCarrito.innerHTML=""
        arrayCarrito.forEach(bebida =>{
            muestraCarrito.innerHTML += 
            `<h5>${bebida.unidades} ${bebida.nombre} ${bebida.subtotal}$</h5>`
        })
    }

    // vaciar carrito de compra

    let borrarCarrito = document.getElementById("borrar")
    borrarCarrito.addEventListener("click" , borradoCarrito)

    function borradoCarrito() {
        carrito = [];
        mostrarCarrito(carrito)
        localStorage.removeItem("carritoGuardado")
    }

    // vaciar carrito de compra

    let compra = document.getElementById("comprar")
    compra.addEventListener("click" , comprar)

    function comprar() {
        carrito = [];
        mostrarCarrito(carrito)
        localStorage.removeItem("carritoGuardado")
        alert("Compra finalizada con éxito")
    }