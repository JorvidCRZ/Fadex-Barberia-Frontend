# Aplicación-FadeX-Barbería-Frontend

Frontend de la aplicación web para la gestión integral de una barbería.

Este proyecto corresponde a la interfaz de usuario de **FadeX**, permitiendo gestionar y visualizar las principales funcionalidades del sistema de barbería, como clientes, servicios, reservas, ventas, productos y otros módulos relacionados.

## Tecnologías

* Angular 21.2.19
* TypeScript
* PrimeNG
* PrimeIcons
* Tailwind CSS
* SCSS
* Quill
* Chart.js

## Descripción

El frontend se encarga de proporcionar la interfaz web para los diferentes usuarios del sistema, ofreciendo una experiencia adaptable para su uso desde computadoras y dispositivos móviles.

La aplicación está organizada mediante una arquitectura modular, separando los estilos globales y componentes reutilizables para facilitar el mantenimiento y evolución del sistema.

## Development server

Para iniciar el servidor de desarrollo, ejecuta:

```bash
ng serve
```

Una vez iniciado el servidor, abre tu navegador y accede a:

```text
http://localhost:4200/
```

La aplicación se recargará automáticamente cada vez que modifiques los archivos del proyecto.

## Generación de componentes

Angular CLI permite generar componentes mediante:

```bash
ng generate component component-name
```

Para consultar todos los esquemas disponibles:

```bash
ng generate --help
```

## Building

Para compilar el proyecto:

```bash
ng build
```

Los archivos generados se almacenarán en el directorio `dist/`.

## Pruebas unitarias

Para ejecutar las pruebas unitarias:

```bash
ng test
```

El proyecto utiliza **Vitest** como motor de pruebas.

## Estructura de estilos

Los estilos globales están organizados en módulos SCSS dentro de:

```text
src/styles/
```

Entre los principales archivos se encuentran:

```text
theme.scss
tokens.scss
base.scss
utilities.scss
buttons.scss
forms.scss
badges.scss
tables.scss
primeng.scss
sidebar.scss
datepicker.scss
tabs.scss
animations.scss
quill.scss
products.scss
```

Esta organización permite mantener separados los estilos de cada área y facilita su reutilización dentro del proyecto.

## Recursos adicionales

Para más información sobre Angular CLI:

https://angular.dev/tools/cli
