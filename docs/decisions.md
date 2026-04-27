# decisions.md

> Log de decisiones técnicas importantes del proyecto.
> Cada entrada incluye fecha, decisión, alternativas consideradas, y razón.
> Las decisiones cerradas no se reabren sin razón clara.

---

## 2026-04-27 — Stack base: HTML puro

**Decisión:** Usar HTML, CSS y JavaScript vanilla como base del proyecto.

**Alternativas consideradas:**
- React + Tailwind (usado en versión anterior)
- Vue.js
- Frameworks de juegos como Phaser

**Razón:** El proyecto se ejecuta principalmente en celulares — los frameworks agregan peso de carga sin beneficio claro para este caso. HTML puro permite control total y carga rápida. Los frameworks se considerarán solo si una funcionalidad específica los requiere.

---

## 2026-04-27 — WebRTC con PeerJS

**Decisión:** Usar PeerJS 1.5.1 como librería para conexión entre dispositivos.

**Alternativas consideradas:**
- WebRTC nativo (más complejo, más control)
- Agora.io, Daily.co (servicios de pago)
- Socket.io (no es para video, requiere infraestructura adicional)

**Razón:** PeerJS abstrae la complejidad de WebRTC sin ocultar lo importante. Probado en versión anterior con buen resultado. Gratuito para el volumen actual.

---

## 2026-04-27 — TURN server: Metered.ca

**Decisión:** Usar Metered.ca como TURN server para casos donde la conexión peer-to-peer directa falla.

**Alternativas consideradas:**
- Twilio (de pago)
- Levantar TURN server propio (complejo)
- Sin TURN (la conexión falla en muchas redes)

**Razón:** Plan gratuito suficiente para fase de pruebas. Probado en versión anterior. Migrar a otro proveedor solo si el volumen lo requiere.

---

## 2026-04-27 — AudioContext dentro del gesto del usuario

**Decisión:** El AudioContext se crea siempre dentro del onclick del primer botón que toca el usuario, nunca antes.

**Alternativas consideradas:**
- Crear el AudioContext al cargar la página y usar audioCtx.resume()
- Crear el AudioContext al conectar la cámara

**Razón:** Los navegadores móviles bloquean audio creado fuera de un gesto del usuario. Probado y confirmado durante el desarrollo de la versión anterior — la única forma estable es crear el contexto exactamente en el onclick del botón inicial.

---

## 2026-04-27 — Cámara en primera persona como pendiente crítico

**Decisión:** No diseñar obstáculos hasta resolver la cámara en primera persona.

**Alternativas consideradas:**
- Diseñar obstáculos para cámara fija frontal
- Probar diferentes ángulos de cámara
- Usar cámara cenital (techo)

**Razón:** La cámara fija frontal limita demasiado el diseño espacial de obstáculos. Cámara en primera persona — montada en el cuerpo del performer — desbloquea todo el diseño de niveles. Hasta resolverlo, los niveles permanecen sin diseñar.

---

## Plantilla para nuevas decisiones

## YYYY-MM-DD — Título corto

**Decisión:** Qué se decidió.

**Alternativas consideradas:**
- Opción A
- Opción B

**Razón:** Por qué se eligió esta opción.
