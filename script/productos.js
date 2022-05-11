



const productos = [] //Declaracion de array donde se pushearan los objetos y/o productos obtenidos con fetch.

//Uso de fetch

fetch('../data/data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      productos.push(product)
    })
    mostrarProductos()
  })
  .catch(error => console.log(error))

//Variables

productsEnCarrito = localStorage.getItem("carrito") //Obtener los productos almacenados en local storage.

productsEnCarrito = productsEnCarrito === null ? [] : JSON.parse(productsEnCarrito) //Mostrar productos almacenados en caso de haber alguno en local storage

const divProducts = document.querySelector("#div-products")
const divProductsRow = document.querySelector("#div-products-row")
const productsCard = document.querySelector("#products-cards")
const divCarrito = document.querySelector("#carrito")
const divCarritoRow = document.querySelector("#carrito-row")
const divCarritoCard = document.querySelector("#carrito-cards")

//Eventos

// document.addEventListener('DOMContentLoaded', () => {
//   mostrarProductos()
// })

mostrarCarrito(productsEnCarrito)

//Funciones

function mostrarProductos() {
  productos.forEach(product => {
    
    const divCard = document.createElement('div')
    divCard.className = 'card-m5'
    divCard.style.setProperty("max-width", "540px")

    const divRow = document.createElement('div')
    divRow.className = 'row g-0'

    const divCol = document.createElement('div')
    divCol.className = 'col-md-4'

    const imgCard = document.createElement('img')
    imgCard.src = product.img
    imgCard.alt = product.name
    imgCard.className = 'img-fluid rounded-start'

    const divColMd = document.createElement('div')
    divColMd.className = 'col-md-8 bg-alpha-color-one'

    const divCardBody = document.createElement('div')
    divCardBody.className = 'card-body text-center'

    const cardTitle = document.createElement('h4')
    cardTitle.className = 'card-title'
    cardTitle.textContent = product.name

    const cardText = document.createElement('p')
    cardText.className = 'card-text'
    cardText.textContent = product.description

    const cardPrice = document.createElement('h3')
    cardPrice.textContent = "$" + product.price

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn btn-primary btn-add'
    button.textContent = "Agregar al carrito"
    button.onclick = () => {
      agregarProducto(product.id)
      Toastify({
        text: "¡Producto agregado!",
        duration: 2000,
        className: "info",
        style: {
        background: "yellowgreen",
        }
      }).showToast();
    }

  
    divCardBody.appendChild(cardTitle)
    divCardBody.appendChild(cardText)
    divCardBody.appendChild(cardPrice)
    divCardBody.appendChild(button)
    
    divColMd.appendChild(divCardBody)

    divCol.appendChild(imgCard)

    divRow.appendChild(divCol)
    divRow.appendChild(divColMd)

    divCard.appendChild(divRow)

    productsCard.appendChild(divCard)
    divProductsRow.appendChild(productsCard)
    divProducts.appendChild(divProductsRow)
  
  })
}

function agregarProducto(id) {
  const productosAgregados = productos.find(products => products.id === id)
  if (productsEnCarrito.find(products => products.id === id) === productosAgregados) {
    productosAgregados.cant++
  } else {
    productosAgregados.cant = 1
    productsEnCarrito.push(productosAgregados)
  }
  let carritoJson = JSON.stringify(productsEnCarrito)
  localStorage.setItem("carrito", carritoJson)
  mostrarCarrito(productsEnCarrito)
}

function mostrarCarrito(carrito) {
  
  divCarritoCard.innerHTML = ""

  carrito.forEach(product => {
    
    const divCard = document.createElement('div')
    divCard.className = 'card-m5'
    divCard.style.setProperty("max-width", "540px")

    const divRow = document.createElement('div')
    divRow.className = 'row g-0'

    const divCol = document.createElement('div')
    divCol.className = 'col-md-4'

    const imgCard = document.createElement('img')
    imgCard.src = product.img
    imgCard.alt = product.name
    imgCard.className = 'img-fluid rounded-start'

    const divColMd = document.createElement('div')
    divColMd.className = 'col-md-8 bg-alpha-color-one'

    const divCardBody = document.createElement('div')
    divCardBody.className = 'card-body text-center'

    const cardTitle = document.createElement('h4')
    cardTitle.className = 'card-title'
    cardTitle.textContent = product.name

    const cardText = document.createElement('p')
    cardText.className = 'card-text'
    cardText.textContent = product.description

    const cardPrice = document.createElement('h3')
    cardPrice.textContent = "$" + (product.price * product.cant)

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn btn-danger'
    button.textContent = "Eliminar del carrito"
    button.onclick = () => {
      eliminarProducto(product.id, carrito)
      Toastify({
        text: "¡Producto eliminado!",
        duration: 2000,
        className: "btn btn-danger",
        style: {
        background: "red",
        }
      }).showToast();
    }
    
    const cantidad = document.createElement('h5')
    cantidad.className = 'h5-cantidad'
    cantidad.textContent = product.cant

    divCardBody.appendChild(cardTitle)
    divCardBody.appendChild(cardText)
    divCardBody.appendChild(cardPrice)
    divCardBody.appendChild(button)
    divCardBody.appendChild(cantidad)
    
    divColMd.appendChild(divCardBody)

    divCol.appendChild(imgCard)

    divRow.appendChild(divCol)
    divRow.appendChild(divColMd)

    divCard.appendChild(divRow)

    divCarritoCard.appendChild(divCard)
    divCarritoRow.appendChild(divCarritoCard)
    divCarrito.appendChild(divCarritoRow)
  })
}

function eliminarProducto(id) {
  const productoEliminado = productsEnCarrito.findIndex(products => products.id === id)
  const productoAEliminar = productsEnCarrito.find(products => products.id === id)
  if (productoAEliminar.cant === 1) {
    productsEnCarrito.splice(productoEliminado, 1)
  } else {
    productoAEliminar.cant--
  }
  let carritoJson = JSON.stringify(productsEnCarrito)
  localStorage.setItem("carrito", carritoJson)
  mostrarCarrito(productsEnCarrito)
}
