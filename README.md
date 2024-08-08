# PadelPoint E-commerce

Proyecto Fullstack realizado en Next.js para el cliente y Nest + MySQL para el lado servidor. Este repositorio contiene documentación y detalles respecto al desarrollo del Front-end. El repositorio del stack del Backend, al igual que su documentación respectiva, se puede encontrar [aquí](https://github.com/Lautaro24Fer/PadelPointBackend?tab=readme-ov-file).

## Objetivos y pedidos
Los objetivos principales de este proyecto son claros: una tienda virtual que se sienta más como una experiencia funcional, práctica, cómoda y fluida. Se priorizará el rendimiento y correcto funcionamiento y manejo de la página. Se nos pidió explicitamente que la página no abarque más de lo necesario. El display es el estándar que muchos e-commerce respetan "por protocolo" en línea. Se nos pidió también que la aplicación consista en una parte "Tienda" (despliegue de productos, carrito funcional, método completo de pago y manejo de usuarios) y una parte "Dashboard Administrador" (la posibilidad de editar paletas desde el cliente siendo un usuario con permisos de administrador).

## Tecnologias utilizadas
En el lado del Front, decidí utilizar el framework **Next**. La elección se basó en que Next es un entorno de trabajo intuitivo que posee un buen manejo de SSR (Server Side Rendering) y CSR (Client Side Rendering), a la vez que contiene varias funciones y módulos predeterminados que resultan muy útiles a la vez que facilitan mucho más el trabajo en este tipo de proyectos. Como es mi primera vez lidiando con este framework, sólo me he documentado con lo básico de los conceptos que Next introduce, al igual que con su biblioteca de componentes NextUI, la cual uso con frecuencia en este proyecto. Todo el estilado está realizado con Tailwind CSS, principalmente por elección personal. Algunas librerias adicionales en uso en este proyecto (se pueden ver todas libremente en el package.json) son:

* Phospor-Icons para algunos íconos.
* zod para la creación de unos schemas, cuyo uso sirve para verificar que los ingresos del usuario tanto en un inicio de sesión como en un registro sean los correctos (aunque se realice una verificación en la API, también nos pareció necesaria una primera desde el cliente).
* toastify para notificaciones visuales en algunos momentos donde es necesario interactuar con el usuario para notificarle del éxito o error de un proceso.
* react-responsive-carousel para el carrusel de imágenes principal.
* hook-forms para el manejo de formularios e ingreso de datos.

## Features aplicadas hasta el momento:

- [x] Diseño base, funcional y efectivo.
- [x] Manejo exitoso de endpoints de la API y buena verificación y comunicación con el cliente respecto a los procesos.
- [x] Fetch de productos exitoso con filtros funcionales, asi como página de detalles de producto diseñada y aplicada con éxito.
- [x] Registro de usuarios exitoso,  ingresando exitosamente a la base de datos y con doble verificación de schemas desde el cliente Y la API
- [x] Inicio de sesión local exitoso, próximo a migrarse a Passport para mayor blindaje en la autenticación.
- [x] Inicio de sesión mediante Google y 0Auth exitoso, almacenado en una cookie y correctamente manejado para el ingreso de un nombre de usuario en caso sea el primer inicio de sesión.
- [x] Páginas secundarias útiles como 404, Sobre Nosotros y página de resultado del login funcionales y preparadas.
- [x] Dashboard funcional con, en principio, la posibilidad de actualizar el precio de las paletas al ingresar ID.