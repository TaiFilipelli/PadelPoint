# PadelPoint E-commerce

Proyecto Fullstack realizado en Next.js para el cliente y Nest y MySQL para el lado servidor. Este repositorio contiene documentación y detalles respecto al desarrollo del Front-end.

## Objetivos y pedidos
Los objetivos principales de este proyecto son claros: una tienda virtual que se sienta más como una experiencia funcional, práctica, cómoda y fluida. Se priorizará el rendimiento y correcto funcionamiento y manejo de la página. Se nos pidió explicitamente que la página no abarque más de lo necesario. El display es el estándar que muchos e-commerce respetan "por protocolo" en línea. Se nos pidió también explícitamente que la tienda consista en una parte "Tienda" (despliegue de productos, carrito funcional, método completo de pago y manejo de usuarios) y una parte "Dashboard Administrador" (la posibilidad de editar paletas desde el cliente siendo un usuario con permisos de administrador).

## Tecnologias utilizadas
En el lado del Front, decidimos utilizar un framework que sea intuitivo y posea un buen manejo de SSR (Server Side Rendering) y CSR (Client Side Rendering), a la vez que contiene varias funciones y módulos predeterminados que hacen mucho más sencillo el trabajo en este entorno. Como es mi primera vez lidiando con este framework, sólo me he documentado con lo básico de estos conceptos, al igual que con su biblioteca de componentes NextUI, la cual uso con frecuencia en este proyecto. Todo el estilado está realizado con Tailwind CSS. Algunas librerias adicionales en uso en este proyecto (se pueden ver todas libremente en el package.json) son Phospor-Icons para algunos íconos y zod para la creación de unos schemas, cuyo uso sirve para verificar que los ingresos del usuario tanto en un inicio de sesión como en un registro sean los correctos (aunque se realice una verificación en la API, también nos pareció necesaria una primera desde el cliente).