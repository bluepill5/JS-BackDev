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

## DEMO:

![ProjectSecond](https://user-images.githubusercontent.com/4382527/164957040-7c002d56-30bc-426e-adf7-d796da54dc3c.gif)

## DEMO with Faker:
![ProjectSecondFaker](https://user-images.githubusercontent.com/4382527/166128525-60ff93d0-a288-45b4-8668-a41b6c7afcc2.gif)

## DEMO with session:
![Cookies](https://user-images.githubusercontent.com/4382527/167276998-dea3fad2-8a82-4cb8-8b17-93c3b63f70a4.gif)

## DEMO with authentication:
![Authentication](https://user-images.githubusercontent.com/4382527/168458053-778c5eaf-3971-400a-a249-84f0b04fa745.gif)

## DEMO with fork:
![Fork](https://user-images.githubusercontent.com/4382527/169675186-31126f9f-bf1c-4da3-b391-cb2cd133fea8.gif)


