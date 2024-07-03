# Control 3 - 2024 - forma 2, semestre 1

En este control, deberemos de tomar una serie de criterios de aceptación y convertirlos en tests de todo el flujo.
Para poder ejecutar, debe instalar las librerías necesarias:

```
npm install
```

Finalmente ejecutar el script de tests:

```
npm run test
```

Si se fijan, el script de test definido en el archivo `package.json` tiene el siguiente comando:

```
jest --runInBand
```

La opción `--runInBand` permite correr los tests uno después del otro, y eso evita el problema al levantar
el servidor en un determinado puerto, puesto que cada test lo intenta hacer, y si encuentra que el
puerto ya se está usando, los tests se van a caer.

# Enunciado y casos de uso

Ésta API consiste en proveer una plataforma para consultar eventos históricos en base a 2 criterios:

- Aquellos eventos que ocurren antes de cristo (ac)
- Aquellos eventos que ocurren después de cristo (dc)

Para este control, debemos crear los tests unitarios y de integración necesarios para cubrir los
siguientes casos de uso:

```
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es un string de largo = 2 e igual a 'ac', con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :ocurrence
Entonces: debe devolver un status 200 y en el body, un arreglo con los eventos históricos que hayan resultado de la búsqueda ordenados desde el más antiguo al más nuevo, en donde 'date' siempre es <= 0
```

```
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es un string de largo = 2 e igual a 'dc', con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :ocurrence
Entonces: debe devolver un status 200 y en el body, un arreglo con los eventos históricos que hayan resultado de la búsqueda ordenados desde el más antiguo al más nuevo, en donde 'date' siempre es > 0
```

```
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es un string de largo = 2, con caracteres alfanuméricos o solo númericos, independiente del case de :occurrence
Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:

{
    "message": "Solo se aceptan caracteres no numéricos"
}
```

```
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/history/:ocurrence y el largo sea != 2
Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:

{
    "message": "El input debe ser ac o dc"
}
```

Happy coding!
