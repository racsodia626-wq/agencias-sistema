# code-conventions.md

> Convenciones de código del proyecto.
> Todo el código nuevo sigue estas reglas.
> Si encuentras código que no las sigue, no lo cambies — sigue las convenciones solo en código nuevo.

---

## Idioma

- Comentarios en código: español
- Nombres de variables y funciones: inglés
- Nombres de archivos: inglés en minúscula con guiones — ejemplo: body-detection.js
- Mensajes en pantalla para usuario: español (con futura versión inglés)

---

## Estructura de archivos HTML

Cada archivo HTML sigue este orden:

```
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>...</title>
  <link rel="stylesheet" href="...">
</head>
<body>
  <!-- Estructura HTML -->
  
  <!-- Scripts al final -->
  <script src="..."></script>
  <script>
    // Código inline aquí
  </script>
</body>
</html>
```

---

## Estructura de JavaScript dentro de HTML

Orden dentro del script:

1. Constantes globales
2. Variables de estado
3. Función de inicialización
4. Funciones de UI
5. Funciones de conexión WebRTC
6. Funciones de audio
7. Event listeners
8. Llamada a init()

Ejemplo:

```
// Constantes
const PEER_ID_PREFIX = 'agencias-cam-';

// Estado
let audioCtx = null;
let peerConnection = null;

// Inicialización
function init() { ... }

// UI
function updateStatusLight(color) { ... }

// WebRTC
function connectToPeer(code) { ... }

// Audio
function initAudio() { ... }
function playSound(name) { ... }

// Listeners
document.getElementById('btn-start').addEventListener('click', startSession);

// Iniciar
init();
```

---

## Nombres

### Variables
- camelCase: audioContext, roomCode, performerReady
- Booleanos empiezan con verbo: isConnected, hasDetected, canStart
- Constantes en mayúsculas: PEER_ID_PREFIX, DETECTION_TIMEOUT

### Funciones
- camelCase con verbo al inicio: startCamera(), playSound(), updateStatus()
- Funciones que devuelven booleano empiezan con is o has: isPerformerReady()

### IDs de elementos HTML
- kebab-case: id="btn-start", id="status-light"
- Botones con prefijo btn-: btn-start, btn-pause
- Pantallas con prefijo screen-: screen-setup, screen-game

### Clases CSS
- kebab-case: .button-primary, .status-light
- Modificadores con doble guion: .button-primary--disabled

---

## Comentarios

- Solo comentar lo que no es obvio del código
- No comentar qué hace la línea — comentar por qué se hace así
- Comentarios en español

Ejemplo correcto:

```
// El AudioContext debe crearse aquí dentro del onclick — 
// si se crea fuera del gesto del usuario, queda suspendido en móvil
audioCtx = new AudioContext();
```

Ejemplo incorrecto:

```
// Crea el AudioContext
audioCtx = new AudioContext();
```

---

## CSS

- Una sola hoja de estilos por archivo HTML, inline o externa
- Variables CSS en :root para colores y tipografías que se repiten
- Mobile first — escribir estilos para móvil primero, luego ajustar para desktop con media queries

```
:root {
  --color-bg: #050810;
  --color-primary: #00D4FF;
  --color-success: #00FF88;
  --color-warning: #FFB800;
  --color-danger: #FF3366;
  --font-mono: 'Share Tech Mono', monospace;
  --font-display: 'Rajdhani', sans-serif;
}
```

---

## Mensajes de commit

- En español
- Corto pero descriptivo
- Empezar con verbo en infinitivo: "agregar", "corregir", "actualizar"
- No describir qué archivos cambiaron — describir qué cambió funcionalmente

Ejemplos correctos:
- "agregar silueta de detección al performer"
- "corregir audio que no funcionaba en mobile"
- "actualizar pantalla de inicio con nuevo logo"

Ejemplos incorrectos:
- "cambios en camera.html"
- "fix"
- "WIP"

---

## Tags de versión

- Cada vez que el sistema esté funcionando estable, crear un tag
- Formato: v0.1, v0.2, v1.0
- Incluir descripción de qué funciona en esa versión

---

## Cuando algo no encaja

Si una situación nueva no está cubierta por estas convenciones:
1. Hacerlo de la forma más simple posible
2. Documentarlo aquí después de probarlo
3. Si es una decisión técnica importante, también va en decisions.md
