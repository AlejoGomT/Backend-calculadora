# Backend - Project "Calculadora"

## Estructura de datos

Los datos que se reciben son tipo JSON y deben contener operation y result, por ejemplo:

```
{
  "operation": ["10.0", "*", "2", "/", "8"],
  "result": ["2.5"],
}
```

Al recibir se le asigna una id única por la cual pueden ser obtenidos después, por lo cual la estructura de los datos queda de la siguiente forma

```
"2df56614-21f0-4d3d-b307-f9335b36e015": {
    "operation": ["5", "+", "5"],
    "result": ["10.0"],
    "id": "2df56614-21f0-4d3d-b307-f9335b36e015"
  },
  "d3ff0524-d617-4715-b3e1-650ca50a3c06": {
    "operation": ["10.0", "*", "2", "/", "8"],
    "result": ["2.5"],
    "id": "d3ff0524-d617-4715-b3e1-650ca50a3c06"
  },
  "8a694dda-366e-4164-b4bb-709d8937ec50": {
    "operation": ["5", "+", "6", "+", "6", "+", "6"],
    "result": ["23.0"],
    "id": "8a694dda-366e-4164-b4bb-709d8937ec50"
  }
```

Los datos son almacenados en un archivo nombrado data.json

## Contratos

Los contratos manejados por la API llevan la palabra /memory

### Lista de contratos

1. get('/memory') : Obtiene todos los datos almacenados
2. get('/memory/:id') : Obtiene un dato según el id suministrada
3. post('/memory') : Guarda el dato enviado mientras que su estructura sea válida
4. put('/memory/:id') : Actualmente no esta en uso ya que la calculadora no utiliza este metodo, pero funcionalmente realiza una modificación a un elemento guardado mediante su id
5. delete('/memory/:id') : Elimina un elemento según su id
