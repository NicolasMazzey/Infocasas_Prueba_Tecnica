# 🏡 Infocasas – Prueba Técnica Full-Stack

Este proyecto es una aplicación de gestión de tareas desarrollada como parte de una prueba técnica para **Infocasas**. Incluye:

- ✅ Frontend en React  
- ✅ Backend en Node.js + Express + Sequelize
- ✅ Base de datos local en SQLite  
- ✅ Documentación Swagger para el backend  
- ✅ Contenedores Docker para fácil despliegue  

---

## 🚀 Requisitos

- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados en tu sistema.

---

## ▶️ Instrucciones para correr el proyecto

1. Cloná el repositorio:

   git clone https://github.com/NicolasMazzey/Infocasas_Prueba_Tecnica.git
   cd Infocasas_Prueba_Tecnica


2. Levantá los contenedores:

docker compose up --build

3. Acceso a la aplicación
🔸 Frontend: http://localhost:3000

🔸 Backend API: http://localhost:8080

🔸 Documentación Swagger (API): http://localhost:8080/api-docs


## 🗃️ Base de datos

- Motor: SQLite
- Ubicación: backend/database.sqlite
- Persistencia: local

## 📄 Comandos adicionales

Ejecutar dentro de /backend
(Utilizenlos si eliminaron la base de datos local) 

- Crear la base de datos (eliminar la carpeta database.sqlite si da error al crear)
npx sequelize-cli db:migrate

- Inicializar la base de datos (base de datos vacia)
npx sequelize-cli db:seed:all

## 🐘 PHP

No pude instalar php correctamente por un error con los archivos cacert.pem y php_init, por lo cual
use node.js para no complicarme la vida despues de estar 4 horas arreglando el problema:

The Composer installer script was not successful [exit code 1].

OpenSSL failed with a 'certificate verify failed' error. This indicates a problem with the Certificate Authority file(s) on your system, which may be out of date.

Certificate location [from openssl.cafile ini setting]:
C:\php\extras\ssl\cacert.pem

The php.ini used by your command-line PHP is: C:\php\php.ini

Script Output:
The "https://getcomposer.org/versions" file could not be downloaded: SSL operation failed with code 1. OpenSSL Error messages:
error:0A000086:SSL routines::certificate verify failed
Failed to enable crypto
Failed to open stream: operation failed

