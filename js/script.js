fetch("../data.json")
  .then((respuesta) => respuesta.json())
  .then((bebidas) => {
    miPrograma(bebidas);
  });

function miPrograma(bebidas) {
  let carrito = [];

  // USUARIO DE LA PAGINA

  localStorage.setItem("usuarioBD", "pabloRossi");

  // CONTRASEÑA DE LA PAGINA

  localStorage.setItem("contraseñaBD", "pabloRossi123");

  //   incio de sesion para poder ver los productos

  let usuarioIngresado = document.getElementById("usuario");
  let contraseñaIngresada = document.getElementById("contraseña");
  let ingresar = document.getElementById("iniciarSesion");
  let ingresado = document.getElementById("ingresado");
  let inicio = document.getElementById("inicio");

  ingresar.addEventListener("click", probar);

  // alertas por pantalla

  function alertaUno(icon, title, text) {
    swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
  function alertaDos(texto) {
    Toastify({
      text: texto,
      duration: 10000,
      newWindow: true,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }

  if (localStorage.getItem("sesionIniciada") == "si") {
    ingresado.classList.remove("ocultar");
    inicio.classList.add("ocultar");
    document.getElementById("main").classList.remove("construccion");
    carrito.forEach((bebida) => {
      let productoBuscado = bebidas.find(
        (producto) => producto.id == bebida.id
      );
      let posicionStockMas = bebidas.findIndex(
        (producto) => producto.id == productoBuscado.id
      );
      bebidas[posicionStockMas].stock =
        bebidas[posicionStockMas].stock - bebida.unidades;
    });
    setTimeout(() => {
      mostrarProductos(bebidas);
    }, 3000);
  }

  let cerrarSesiones = document.getElementById("cerrarSesion");
  cerrarSesiones.addEventListener("click", cerrarSesion);

  function cerrarSesion() {
    Swal.fire({
      title: "¿Esta seguro de cerrar sesion?",
      // text: "El total de la compra es: " + total + " $",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Gracias por navegar en la web", "Vuelva pronto", "success");
        localStorage.removeItem("sesionIniciada");
        ingresado.classList.add("ocultar");
        inicio.classList.remove("ocultar");
        document.getElementById("main").classList.add("construccion");
        cerrarSesiones.classList.add("ocultar");
      }
    });
  }

  function probar() {
    if (usuarioIngresado.value == localStorage.getItem("usuarioBD")) {
      if (contraseñaIngresada.value == localStorage.getItem("contraseñaBD")) {
        alertaUno("success", "Bienvenido " + usuarioIngresado.value, "");
        ingresado.classList.remove("ocultar");
        inicio.classList.add("ocultar");
        document.getElementById("main").classList.remove("construccion");
        cerrarSesiones.classList.remove("ocultar");
        carrito.forEach((bebida) => {
          let productoBuscado = bebidas.find(
            (producto) => producto.id == bebida.id
          );
          let posicionStockMas = bebidas.findIndex(
            (producto) => producto.id == productoBuscado.id
          );
          bebidas[posicionStockMas].stock =
            bebidas[posicionStockMas].stock - bebida.unidades;
        });
        setTimeout(() => {
          mostrarProductos(bebidas);
        }, 3000);
        localStorage.setItem("sesionIniciada", "si");
      } else {
        alertaUno("error", "Contraseña incorrecta", "");
      }
    } else {
      alertaUno("error", "Usuario inexistente", "");
    }
  }

  // logica para poder ver el carrito de compras

  let botonCarrito = document.getElementById("botonCarrito");
  let carritoDiv = document.getElementById("carritoDiv");
  botonCarrito.addEventListener("click", verCarrito);

  function verCarrito() {
    if (carritoDiv.classList.contains("ocultar")) {
      carritoDiv.classList.remove("ocultar");
    } else {
      carritoDiv.classList.add("ocultar");
    }
  }

  // recuperado de carrito de json

  if (localStorage.getItem("carritoGuardado")) {
    carrito = JSON.parse(localStorage.getItem("carritoGuardado"));
    mostrarCarrito(carrito);
  }

  // filtrado por inputs

  let checks = document.getElementsByClassName("input");

  for (const check of checks) {
    check.addEventListener("click", filtradoCheck);
  }

  function filtradoCheck(e) {
    // que filtros debe aplicar
    let filtros = [];
    let filtradoCheck = [];
    let sinFiltro = true;
    for (const check of checks) {
      if (check.checked) {
        filtros.push(check.id);
        sinFiltro = false;
      }
    }
    //creacion de array filtrado
    filtradoCheck = bebidas.filter((productos) =>
      filtros.includes(productos.categoria)
    );
    //si no hay filtro muestra todo el array completo
    if (sinFiltro) {
      filtradoCheck = bebidas;
    }
    // muestreo de array filtrado
    mostrarProductos(filtradoCheck);
    return filtradoCheck;
  }

  //   RENDERIZADO DE ARRAY DE PRODUCTOS

  function mostrarProductos(arrayProductos) {
    let productos = document.getElementById("productos");
    productos.innerHTML = "";
    arrayProductos.forEach((array) => {
      productos.innerHTML += `<div class="tarjetaProducto col-2 d-flex flex-column align-items-center justify-content-center shadow h-auto">
                    <img src="${array.img}" alt="${array.nombre}" height="100px" width="auto">
                    <h2 class="tituloProducto">${array.nombre}</h2>
                    <h3 class="precioProducto">${array.precio} $</h3>
                    <h4 class="stockProducto">Quedan ${array.stock} en stock</h4>
                    <input class="botonProducto" id="${array.id}" type="button" value="Agregar al carrito">
                </div>`;
    });

    // boton de agregado de carrito

    arrayProductos.forEach((array) => {
      let boton = document.getElementById(array.id);
      boton.addEventListener("click", agregarCarrito);
    });
  }

  // BARRA DE BUSQUEDA DE PRODUCTOS

  let barraBuscador = document.getElementById("barraBuscador");
  let botonBuscar = document.getElementById("botonBuscar");
  botonBuscar.addEventListener("click", filtro);
  function filtro() {
    console.log();
    let bebidaFiltrada = filtradoCheck().filter((producto) =>
      producto.nombre.toLowerCase().includes(barraBuscador.value.toLowerCase())
    );
    mostrarProductos(bebidaFiltrada);
  }

  // AGREGADO DE PRODUCTOS AL CARRITO

  function agregarCarrito(e) {
    let productoBuscado = bebidas.find(
      (producto) => producto.id == e.target.id
    );
    let posicionStockMenos = bebidas.findIndex(
      (bebida) => bebida.id == productoBuscado.id
    );
    if (bebidas[posicionStockMenos].stock == 0) {
      alertaDos("No hay stock");
    } else {
      if (carrito.some((bebida) => bebida.id == productoBuscado.id)) {
        let posicion = carrito.findIndex(
          (bebida) => bebida.id == productoBuscado.id
        );
        carrito[posicion].unidades = carrito[posicion].unidades + 1;
        carrito[posicion].subtotal =
          carrito[posicion].precio * carrito[posicion].unidades;
      } else {
        carrito.push({
          img: productoBuscado.img,
          id: productoBuscado.id,
          nombre: productoBuscado.nombre,
          precio: productoBuscado.precio,
          unidades: 1,
          subtotal: productoBuscado.precio,
        });
      }
      bebidas[posicionStockMenos].stock = bebidas[posicionStockMenos].stock - 1;
      mostrarProductos(bebidas);
    }
    // guardado de carrito en JSON
    localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
    mostrarCarrito(carrito);
  }

  function mostrarCarrito(arrayCarrito) {
    let muestraCarrito = document.getElementById("carrito");
    muestraCarrito.innerHTML = "";
    arrayCarrito.forEach((bebida) => {
      muestraCarrito.innerHTML += `
                <div class="row d-flex align-items-center justify-content-center">
                    <div class="col-2">
                        <img src="${bebida.img}" alt="${bebida.nombre}" height="100px" width="auto">
                    </div>
                    <div class="col-3">
                        <h2 class="tituloProducto" >${bebida.nombre}</h2>
                    </div>
                    <div class="col-3">
                        <h3 class="precioProducto" >${bebida.subtotal} $</h3>
                    </div>
                    <div class="col-2">
                        <h3 class="unidadesProducto" >${bebida.unidades} Un.</h3>
                    </div>
                    <div class="col-2">
                        <button class="botonEliminar" id="boton${bebida.id}">Eliminar</button>
                    </div>
                <div>
                <hr>
                `;
    });
    arrayCarrito.forEach((array) => {
      let botonEliminar = document.getElementById("boton" + array.id);
      botonEliminar.addEventListener("click", eliminarProducto);
    });
  }

  function eliminarProducto(e) {
    let productoBuscadoEliminado = bebidas.find(
      (producto) => "boton" + producto.id == e.target.id
    );
    if (carrito.some((bebida) => bebida.id == productoBuscadoEliminado.id)) {
      let posicionStockMas = bebidas.findIndex(
        (bebida) => bebida.id == productoBuscadoEliminado.id
      );
      let posicionEliminar = carrito.findIndex(
        (bebida) => bebida.id == productoBuscadoEliminado.id
      );
      bebidas[posicionStockMas].stock =
        bebidas[posicionStockMas].stock + carrito[posicionEliminar].unidades;
      carrito.splice(posicionEliminar, 1);
    }
    alertaDos("Producto Eliminado");
    mostrarCarrito(carrito);
    mostrarProductos(bebidas);
  }

  // vaciar carrito de compra

  let borrarCarrito = document.getElementById("borrar");
  borrarCarrito.addEventListener("click", borradoCarrito);

  function borradoCarrito() {
    carrito.forEach((bebida) => {
      let productoBuscado = bebidas.find(
        (producto) => producto.id == bebida.id
      );
      let posicionStockMas = bebidas.findIndex(
        (producto) => producto.id == productoBuscado.id
      );
      bebidas[posicionStockMas].stock =
        bebidas[posicionStockMas].stock + bebida.unidades;
    });
    mostrarProductos(bebidas);
    carrito = [];
    mostrarCarrito(carrito);
    localStorage.removeItem("carritoGuardado");
  }

  // vaciar carrito de compra

  let compra = document.getElementById("comprar");
  compra.addEventListener("click", comprar);

  function comprar() {
    let total = 0;
    carrito.forEach((bebida) => {
      total = total + bebida.unidades * bebida.precio;
    });
    Swal.fire({
      title: "¿Esta seguro de finalizar la compra?",
      text: "El total de la compra es: " + total + " $",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, confirmar compra!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Compra realizada con exito!",
          "Muchas gracias por su compra.",
          "success"
        );
        carrito = [];
        mostrarCarrito(carrito);
        localStorage.removeItem("carritoGuardado");
      }
    });
  }
}
