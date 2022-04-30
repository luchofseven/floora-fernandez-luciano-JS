//Variables

const products = [
  {
    id: 1,
    img: "../img/labial-gloss.jpg",
    name: "Brillo Labial",
    description: "Brillo labial ultra brillante de acabado húmedo. Hidrata sin ser pegajoso. Crea un efecto de volumen.",
    price: 395
  },
  {
    id: 2,
    img: "../img/labial-liquido.jpg",
    name: "Labial Líquido",
    description: "Labial líquido de color intenso y acabado satinado. Híbrido que cumple la función de labial y gloss a la vez.",
    price: 385
  },
  {
    id: 3,
    img: "../img/labial-holografico.jpg",
    name: "Labial Holográfico",
    description: "Brillo labial holográfico ultra brillante con pigmentos móviles que se transfroman en color.",
    price: 390
  },
  {
    id: 4,
    img: "../img/labial-aterciopelado.jpg",
    name: "Labial Aterciopelado",
    description: "Labial líquido de fórmula ligera y alta pigmentación. Hidratante, cremoso y de acabado aterciopelado.",
    price: 385
  },
  {
    id: 5,
    img: "../img/ojos-fibra.jpg",
    name: "Delineador Fibra",
    description: "Delineador en fibra. Negro Intenso. Larga duración y resistente al agua.",
    price: 295
  },
  {
    id: 6,
    img: "../img/ojos-mascara.jpg",
    name: "Máscara de Pestañas",
    description: "Máscara de pestañas waterproof. Negro intenso. Crea volumen y alarga las pestañas.",
    price: 395
  },
  {
    id: 7,
    img: "../img/ojos-lapiz.jpg",
    name: "Lápiz Delineador",
    description: "Delineador en lápiz negro intenso. Textura supercremosa que se aplica sin esfuerzo. Larga duración.",
    price: 150
  },
  {
    id: 8,
    img: "../img/ojos-sombras.jpg",
    name: "Paleta Pastel",
    description: "Paleta con gama de todos mates, superiridiscentes y metalizados que permiten lograr diferentes looks.",
    price: 685
  },
  {
    id: 9,
    img: "../img/rostro-polvo.jpg",
    name: "Polvo Volátil",
    description: "Polvo suelto ultraligero que fija y prolonga la duración del maquillaje.",
    price: 450
  },
  {
    id: 10,
    img: "../img/rostro-base.jpg",
    name: "Base Líquida",
    description: "Base fluída de alta cobertura. No reseca la piel. Larga duración.",
    price: 480
  },
  {
    id: 11,
    img: "../img/rostro-bronzer.jpg",
    name: "Paleta de Bronzers",
    description: "Paleta de bronceadores mates y brillantes para dar profunidad y dimensión.",
    price: 500
  },
  {
    id: 12,
    img: "../img/rostro-iluminador.jpg",
    name: "Paleta de Iluminadores",
    description: "Paleta de cuatro iluminadores, para conseguir desde un brillo natural hasta un mega glow.",
    price: 500
  },
  {
    id: 13,
    img: "../img/esmalte-colores.jpg",
    name: "Esmaltes",
    description: "Esmalte para uñas. 24 Tonos.",
    price: 200
  },
  {
    id: 14,
    img: "../img/esmaltes-matificante.jpg",
    name: "Esmalte Matificante",
    description: "Protege el esmalte y proporciona a la uña un acabado efecto mate sobre cualquier esmalte común.",
    price: 300
  }
]

productsEnCarrito = localStorage.getItem("carrito")

productsEnCarrito === null ? productsEnCarrito = [] : productsEnCarrito = JSON.parse(productsEnCarrito)


const divProducts = document.querySelector("#div-products")
const divProductsRow = document.querySelector("#div-products-row")
const productsCard = document.querySelector("#products-cards")
const divCarrito = document.querySelector("#carrito")
const divCarritoRow = document.querySelector("#carrito-row")
const divCarritoCard = document.querySelector("#carrito-cards")

//Eventos

document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos()
})

mostrarCarrito(productsEnCarrito)

//Funciones

function mostrarProductos() {
  products.forEach(product => {
    
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
  const productosAgregados = products.find(products => products.id === id)
  productsEnCarrito.push(productosAgregados)
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
    cardPrice.textContent = "$" + product.price

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
  
    divCardBody.appendChild(cardTitle)
    divCardBody.appendChild(cardText)
    divCardBody.appendChild(cardPrice)
    divCardBody.appendChild(button)
    
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
  const productoEliminado = productsEnCarrito.findIndex(product => product.id === id)
  productsEnCarrito.splice(productoEliminado, 1)
  let carritoJson = JSON.stringify(productsEnCarrito)
  localStorage.setItem("carrito", carritoJson)
  mostrarCarrito(productsEnCarrito)
}
