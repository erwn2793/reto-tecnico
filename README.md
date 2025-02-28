# reto-tecnico
Repositorio del reto tecnológico que incluirá el backend y frontend

# Backend
## _Instrucciones para levantar el backend_

Tener docker corriendo en la computadora.

- clonar el repositorio e ingresar a la carpeta reto-backend
- copiar y pegar el archivo .env.example y renombrarlo a .env
- ejecutar el siguiente comando:
```sh
docker-compose --env-file .env up --build
```

# Frontend
## _Instrucciones para levantar el frontend_

- clonar el repositorio e ingresar a la carpeta reto-frontend
- ejecutar el siguiente comando:
```sh
yarn && yarn run dev
```