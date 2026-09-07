# Plan de terapia ocupacional en casa

Sitio web sencillo y muy visual para guiar, en casa, un plan de actividades de
**integración sensorial** para un niño pequeño (~2 años): juego táctil gradual,
tolerancia auditiva, trabajo vestibular y propioceptivo para la autorregulación,
motor oral y mantenimiento de motricidad fina/gruesa e independencia diaria.

**Uso:** abre `index.html` (o el sitio publicado) desde el teléfono, la tablet o
la computadora de la casa.

## Privacidad

Este repositorio es **público**, así que **no contiene ningún dato personal**.

- El nombre del niño, la foto, las notas de cada actividad, el progreso diario y
  cualquier cambio al plan se guardan **solo en el navegador** de cada
  dispositivo (`localStorage`). Nada se envía a ningún servidor.
- Para pasar la configuración de un dispositivo a otro: menú **⚙️ → Exportar**
  genera un archivo `.json`; en el otro dispositivo, **⚙️ → Importar**.
- El informe de evaluación **no** está en este repositorio.

## Personalización

Botón **✏️ Editar** (abajo a la derecha):

- Editar cualquier actividad (título, ícono, categoría, materiales, pasos,
  señales de cuidado, para qué sirve).
- Crear actividades nuevas o ocultar las que no usen.
- Reorganizar el plan semanal: reordenar, mover de día, quitar, añadir.
- Renombrar los días.

Menú **⚙️**: nombre y foto del niño, exportar/importar, restaurar, borrar todo.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Estructura de la página |
| `styles.css` | Estilos |
| `app.js` | Lógica (estado en `localStorage`) |
| `data.js` | Contenido por defecto de las actividades y del plan semanal |

Sin dependencias ni build. Se publica con GitHub Pages desde la rama `main`.

## Aviso

Guía de apoyo para casa. No sustituye la terapia ocupacional ni las indicaciones
de la profesional.
