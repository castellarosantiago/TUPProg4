# Práctico de Programación 4 - UTN

# Autores:
            -Castellaro Santiago
            -General Paula
            -Gerdes Lourdes
            -Minor Santiago

## Estructura del Proyecto


- Cada carpeta `ejX` (por ejemplo, `ej1`, `ej2`, etc.) corresponde a un ejercicio del práctico.
- Dentro de cada carpeta de ejercicio encontrarás:
  - Un archivo `index.ts` con las pruebas y ejemplos de uso de ese ejercicio.
  - Un archivo `README.md` con instrucciones específicas para ese ejercicio.
  - Subcarpetas `clases/` y `interfaces/` con las implementaciones correspondientes.

## ¿Cómo ejecutar los ejercicios?

1. **Requisitos previos:**
   - Tener instalado [Node.js](https://nodejs.org/) y [ts-node](https://typestrong.org/ts-node/).
   - Estar ubicado en la raíz del proyecto en la terminal.

2. **Ejecutar un ejercicio individual:**

   Usa el siguiente comando, reemplazando `ejX` por el número del ejercicio que quieras probar:

   ```bash
   npm run ejX

O tambien:

   ts-node src/ejX/index.ts

    ---

   Ejemplo: Para ejecutar el ejercicio 3:

   npm run ej3

   o alternativamente

   ts-node src/ej3/index.ts

# 3.Contenidos de cada carpeta

index.ts: Archivo principal de pruebas del ejercicio.
README.md: Explicación y guía para ese ejercicio.
clases/: Clases implementadas para el ejercicio.
interfaces/: Interfaces utilizadas (si aplica).

# 4.Notas:

Se puede ejecutar cada ejercicio de forma independiente
Si se quiere, se puede crear un archivo src/index.ts general para ejecutar todos los ejercicios juntos

---

Si surgen dudas, consultar el README de cada ejercicio