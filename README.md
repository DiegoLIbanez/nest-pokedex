<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar En Desarrollo

1. Clonar el repositorio

2. Ejecutar
```
npm install || npm i
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos 
```
  docker-compose up -d
```
5. Clonar el archivo __.example.env__ y renombrar la copia a __.env__

6. Llenar la variables definidas en el __.env__

7. Ejecutar la aplicaion dev:
```
npm run start:dev
```

8. Recontruir la base de datos con la semilla

``` 
http://localhost:3000/api/v2/seed
```
## Stack Usado
* MongoDb

* Nest
