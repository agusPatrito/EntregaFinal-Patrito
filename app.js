

let itemsCarrito = [];


function actualizarCarrito() {
  const listaCarrito = document.getElementById('cart-list');
  const cantidadTotal = document.getElementById('subtotal-amount');
  listaCarrito.innerHTML = '';

  
  itemsCarrito.forEach(item => {
    const listaItems = document.createElement('li');
    listaItems.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    listaCarrito.appendChild(listaItems);
  });


  const subtotal = itemsCarrito.reduce((total, item) => total + item.precio, 0);
  cantidadTotal.textContent = `$${subtotal.toFixed(2)}`;

  Swal.fire({
    title: 'Item agregado',
    text:  'El producto fue agregado al carrito.',
    icon:'success',
    timer: 1000,
    showConfirmButton: false,
  })
  document.getElementById('confirmar-compra-boton').addEventListener('click', () =>{
    Swal.fire({
      title: 'Compra Confirmada',
      text: 'Estas seguro que quieres confirmar la compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText:  'Cancelar',
      reverseButtons: true

    }).then(result =>{
      if (result.isConfirmed){
        itemsCarrito = [];
        actualizarCarrito();
      }
    })
  })
}


function agregarAlCarrito(producto) {
  itemsCarrito.push(producto);
  actualizarCarrito();
}

fetch('../productos.json')
  .then(response => response.json())
  .then(data => {
    const contenedorProductosCarrito = document.getElementById('product-cards');

    data.forEach(producto => {
      const divProduct = document.createElement('div');
      divProduct.classList.add('product-card', 'col-4', 'col-md-4');

      const imgProduct = document.createElement('img');
      imgProduct.src = producto.imagen;
      imgProduct.alt = '';

      const botonProduct = document.createElement('button');
      botonProduct.classList.add('boton-sin-texto');
      botonProduct.textContent = producto.nombre;

      const precioProduct = document.createElement('p');
      precioProduct.textContent = `$${producto.precio.toFixed(2)}`;

      // Add event listener to the button for adding to cart
      botonProduct.addEventListener('click', () => agregarAlCarrito(producto));

      divProduct.appendChild(imgProduct);
      divProduct.appendChild(botonProduct);
      divProduct.appendChild(precioProduct);

      contenedorProductosCarrito.appendChild(divProduct);
    });
  })
  .catch(error => {
    console.error('Error al obtener los productos:', error);
  });
