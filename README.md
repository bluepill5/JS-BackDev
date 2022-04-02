# Javascript - Websockets

## Descripción del proyecto

1) Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real:
    - Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista.
    - Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.

2) Añadiremos al proyecto un canal de chat entre los clientes y el servidor.
    - En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el servidor, donde figuren los mensajes de todos los usuarios identificados por su email.
    - El formato a representar será: email (texto negrita en azul) [fecha y hora (DD/MM/YYYY HH:MM:SS)](texto normal en marrón) : mensaje (texto italic en verde)
    - Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email (obligatorio para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón.
    - Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable).

## Plantilla:

- [Handlebars](https://github.com/bluepill5/JavaScript-Dev/tree/master/work_05/src)

## Ejecución:

- *npm run wss*

![Websockets](https://user-images.githubusercontent.com/4382527/160265975-e30bac83-6d1b-4b2b-b206-59dc9db1f560.gif)



