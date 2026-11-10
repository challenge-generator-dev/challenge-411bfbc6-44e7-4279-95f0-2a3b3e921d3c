# Exposición del Catálogo de Productos

Como desarrollador backend en una fintech, tu tarea es construir y exponer un catálogo de productos a través de una API REST. Debes asegurarte de que los endpoints estén correctamente validados y que los errores sean manejados de manera centralizada. Los productos tienen atributos como nombre, precio, stock y categoría. Prohíbe precios negativos y nombres duplicados. Decide cómo estructurar la API y qué hacer cuando una validación falla.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construccion de APIs REST con Express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 4 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición de Endpoints

**Objetivo:** Definir los endpoints necesarios para exponer el catálogo de productos.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Identifica los endpoints necesarios para listar y obtener detalles de los productos.
- Define la estructura de los endpoints y los métodos HTTP apropiados.

**Entregable:** Descripción de los endpoints y sus métodos HTTP.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la estructura de la URL para cada endpoint.
- Piensa en cómo representar los datos de los productos en la respuesta.

</details>

### Fase 2: Validación de Entrada

**Objetivo:** Implementar la validación de entrada para los endpoints.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Aplica validaciones para asegurar que los productos tengan nombre, precio, stock y categoría válidos.
- Prohíbe precios negativos y nombres duplicados.

**Entregable:** Implementación de la validación de entrada en los endpoints.

<details>
<summary>Pistas de conocimiento</summary>

- Usa middleware para aplicar validaciones.
- Considera cómo manejar los errores de validación.

</details>

### Fase 3: Manejo Centralizado de Errores

**Objetivo:** Implementar un manejo centralizado de errores para la API.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Crea un middleware para manejar los errores de forma centralizada.
- Asegúrate de que los errores sean devueltos en un formato consistente.

**Entregable:** Middleware de manejo de errores implementado.

<details>
<summary>Pistas de conocimiento</summary>

- Usa un middleware para capturar y formatear los errores.
- Considera cómo devolver los errores al cliente de forma consistente.

</details>

### Fase 4: Exposición del Catálogo

**Objetivo:** Exponer el catálogo de productos a través de la API.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Implementa los endpoints definidos para listar y obtener detalles de los productos.
- Asegúrate de que la API devuelva los datos de los productos correctamente.

**Entregable:** API REST funcional que expone el catálogo de productos.

<details>
<summary>Pistas de conocimiento</summary>

- Usa los endpoints y validaciones definidos en las fases anteriores.
- Asegúrate de que la API devuelva los datos de los productos en el formato correcto.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los endpoints y cómo se definen en una API REST?
- **paraQueSirve**: ¿Para qué sirven las validaciones de entrada en una API REST?
- **comoSeUsa**: ¿Cómo se implementa el manejo centralizado de errores en una API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes al validar la entrada de datos en una API REST?
- **queDecisionesImplica**: ¿Qué decisiones debes tomar al estructurar y manejar los errores en una API REST?

## Criterios de Evaluacion

- Definición correcta de endpoints y métodos HTTP.
- Implementación de validaciones de entrada para los productos.
- Manejo centralizado de errores en la API.
- Exposición correcta del catálogo de productos a través de la API.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
