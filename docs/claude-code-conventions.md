# claude-code-conventions.md

> Convenciones para trabajar con Claude Code.
> Aplicar siempre que se le da una instrucción.

---

## Antes de pedir cualquier cosa

1. ¿Está esta tarea documentada en algún .md? — citar el archivo
2. ¿Hay un prompt en prompts.md que sirve? — usar ese
3. ¿Es una decisión nueva? — documentarla en decisions.md después

---

## Estructura ideal de una instrucción

Una buena instrucción tiene:

1. Contexto mínimo — qué archivo, qué situación
2. Acción específica — qué hacer exactamente
3. Reglas — qué NO hacer
4. Punto de pausa — cuándo detenerse y consultar

Ejemplo:

```
En app/core/camera.html (contexto), agrega un botón de copiar 
código de sala (acción específica). 

Reglas:
- No tocar la lógica de WebRTC
- No modificar nada fuera de las líneas que necesite agregar
- No usar librerías externas

Cuando termines, avísame qué líneas agregaste y espera mi 
prueba antes de continuar (punto de pausa).
```

---

## Cómo NO dar instrucciones

Estas formas desperdician tokens y generan errores:

Demasiado abierto:
```
Mejora la app
```

Sin contexto:
```
Agrega un botón
```

Sin punto de pausa:
```
Construye el sistema completo de niveles
```

Asumiendo que recuerda:
```
Como hablamos antes, haz eso
```

Claude Code no recuerda sesiones anteriores. Cada sesión empieza desde cero — siempre dar contexto explícito.

---

## Cuándo dar contexto adicional

Solo cuando el contexto NO está en los .md:

- Si es información nueva que no hemos documentado
- Si es una restricción específica de hoy
- Si es una preferencia personal puntual

Si está en los .md, no repetirlo — confiar en que los lee.

---

## Cuándo pedir que revise antes de hacer

Pedir revisión antes de modificar cuando:
- El cambio toca código que ya funciona
- El cambio afecta la conexión entre dispositivos
- El cambio afecta el sistema de audio
- El cambio afecta más de un archivo

No pedir revisión cuando:
- Es la primera vez que se crea un archivo
- Es un cambio aislado de UI
- Es un cambio de texto o estilo simple

---

## Manejo de tokens — eficiencia

Para que las sesiones duren más:

1. Empezar con prompt corto: "Lee los .md y resume estado"
2. Pedir un cambio a la vez: no acumular varios cambios en una sola instrucción
3. No pedirle que "explore" o "revise todo": indicarle exactamente qué archivo abrir
4. Cerrar con /pausa: activa el flujo de cierre que actualiza CONTEXT.md

---

## Cuándo cerrar sesión

Cerrar con /pausa cuando:
- Algo funciona y quieres guardar el progreso
- Vas a tomar un descanso largo
- Estás llegando al 90% del límite de tokens
- Vas a cambiar de tema completamente

No cerrar cuando:
- Estás en medio de depurar un problema (perderías contexto)
- Acabas de hacer un cambio que no has probado

---

## Si Claude Code se confunde

Señales de que se confundió:
- Está modificando archivos que no le pediste
- Está reescribiendo en vez de agregar
- Está repitiendo código que ya existe
- Está sugiriendo soluciones que ya intentamos

Qué hacer:
1. Decir "para" inmediatamente
2. Pedirle que lea CONTEXT.md de nuevo
3. Reformular la instrucción con más contexto
4. Si persiste, cerrar sesión con /pausa y empezar limpia
