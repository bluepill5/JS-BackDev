# eCommerce Backend

## Descripción:

La idea del repositorio es practicar conceptos de backend con JavaScript mediante la idea de un ecommerce.

## Tecnologías usadas

- JavaScript
- Node
- Express

## Aspectos a considerar

1. El router base '/api/productos' implementará cuatro funcionalidades:


    - GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
    - POST: '/' - Para incorporar productos al listado (disponible para administradores)
    - PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
    - DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

2. El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:


    - POST: '/' - Crea un carrito y devuelve su id.
    - DELETE: '/:id' - Vacía un carrito y lo elimina.
    - GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
    - POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
    - DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

3. Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada}

4. Un producto dispondrá de los siguientes campos: id, timestamp, nombre, descripcion, código, foto (url), precio, stock.

5. El carrito de compras tendrá la siguiente estructura:
   id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }

6. El timestamp puede implementarse con Date.now()

7. Comenzar a trabajar con el listado de productos y el carrito de compras en memoria del servidor, luego persistirlos en el filesystem.