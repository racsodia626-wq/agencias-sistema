# CLAUDE.md

## Quién soy
Racso Sami Cabrera Hernández — artista contemporáneo mexicano desarrollando proyectos transdisciplinarios con base en el movimiento del cuerpo.

Este proyecto vive dentro de:
Racso Cabrera Company / Proyectos Artísticos / AGENCIAS PROJECT

## Este proyecto
AGENCIAS es un sistema coreográfico experimental. Tres roles: Controlador, Performer, Sistema. La pregunta central: ¿cómo se manifiesta la agencia del cuerpo cuando es controlado por sistemas externos?

## Idioma
Responde en el idioma en que te escriba.

## Dispositivos
- Performer: celular con cámara trasera activa y audífonos bluetooth
- Controlador: laptop o celular — varía por sesión
- Todo debe funcionar en móvil primero — desktop es secundario
- Probar siempre en dispositivo real, no en simulador

## Stack técnico
- Base: HTML puro, CSS, JavaScript vanilla
- Librerías: solo cuando sean necesarias y se consulte primero
- Frameworks: solo con razón clara y aprobación explícita
- Decisiones de tecnología: proponer opciones antes de implementar

## Sistema de audio

### Dispositivos
- Performer: audífonos bluetooth — escucha voz + sonido de cada comando
- Controlador: escucha audio del espacio del performer en tiempo real
- El dispositivo del performer capta y transmite audio activamente
- A futuro: efectos adicionales y posible música ambiental

### Regla crítica
El AudioContext debe crearse dentro del gesto del usuario — nunca antes. Si se crea antes el navegador móvil lo suspende y el audio no funciona.

### Los 8 comandos y sus sonidos

Navegación — tono continuo mientras se mantiene presionado:
- AVANZA — voz "AVANZA" + tono grave continuo
- RETROCEDE — voz "RETROCEDE" + tono agudo continuo
- GIRA IZQ — voz "GIRA IZQ" + click seco
- GIRA DER — voz "GIRA DER" + click seco

Acción — sonido único al presionar:
- SALTA — voz "SALTA" + poing ascendente
- AGÁCHATE — voz "AGÁCHATE" + tick descendente
- RODAR — voz "RODAR" + rumble
- STOP — voz "STOP" + corte brusco

### Silencio
Sin comando activo → tono para → performer se detiene

## Página de presentación

### URL
Por confirmar al conectar Vercel al nuevo repo

### Idiomas
Español e inglés con toggle — ambos deben estar siempre sincronizados

### Secciones en orden — no cambiar sin consultar
1. Hero — título AGENCIAS + nombre del artista
2. Sobre el proyecto — descripción + pregunta central
3. Los tres roles — Controlador, Performer, Sistema
4. Lenguaje corporal y estética
5. Lógica de videojuegos
6. Plan de desarrollo — etapas
7. Abierto a colaboración
8. Sobre el artista — bio + foto
9. Footer — contacto, email, Instagram

### Estética
- Fondo: #050810
- Tipografía: Share Tech Mono + Rajdhani
- Color principal: #00D4FF
- Coherente con la app — misma paleta y tipografía

### Reglas
- Las secciones no se reordenan ni eliminan sin consultar
- El contenido de texto lo revisa y aprueba Racso antes de publicar
- A futuro: embed teaser Sabor Fresa, sección gira Europa 2026, mini experimento interactivo para visitantes

## Repositorio y deploy
- Repo: github.com/racsodia626-wq/agencias-sistema
- Rama principal: main
- Deploy: Vercel automático desde GitHub — URL por confirmar al conectar
- Carpeta de deploy: /public
- Commits: mensaje corto en español describiendo qué cambió y por qué

## Reglas — nunca sin preguntarme primero
- Borrar archivos
- Cambiar nombres de variables, funciones o archivos
- Modificar el sistema de audio
- Cambiar la arquitectura del proyecto
- Reescribir código que funciona

## Reglas de desarrollo
- Nunca reescribir — copiar exactamente y agregar solo lo nuevo
- Nunca migrar código que funciona sin probarlo paso a paso
- Cada cambio que afecte la conexión entre camera y control debe probarse en ambos dispositivos antes del siguiente cambio
- Comentarios en código en español
- Si detectas que estás repitiendo algo que ya se intentó, avisarme antes de continuar
- Después de cada cambio: avisarme qué cambió y qué probar antes de continuar
- Si funcionó: hacer commit y continuar. Si no funcionó: diagnosticar sin tocar más código

## Qué significa "copiar exactamente y agregar solo lo nuevo"

Cuando un archivo funciona y necesita una función nueva, el proceso es:

1. Abrir el archivo que funciona
2. Copiar el archivo completo sin modificar nada
3. Agregar solo las líneas nuevas necesarias
4. Avisar exactamente qué líneas se agregaron y dónde

Ejemplo correcto:
- camera.html funciona con audio y conexión WebRTC
- Necesita agregar silueta SVG de posicionamiento
- Se copia camera.html completo → se agregan solo las líneas de la silueta
- Se avisa: "agregué la silueta en las líneas 45-67, nada más cambió"

Ejemplo incorrecto:
- camera.html funciona
- Se reescribe camera.html desde cero con la silueta incluida
- Resultado: se pierde funcionalidad que estaba probada

Regla: si para agregar algo nuevo hay que reescribir más de 20 líneas existentes — pausar y consultar antes de continuar.

## Al inicio de cada sesión
1. Leer CONTEXT.md completamente
2. Resumir en 3 líneas qué está funcionando y qué no
3. Preguntar por dónde empezar si no está claro en CONTEXT.md

## Clave de cierre de sesión
Cuando escriba `/pausa`:
1. Hacer commit de todo lo pendiente
2. Actualizar sección "trabajo pendiente" en CONTEXT.md con estado exacto
3. Resumir en 3 líneas dónde quedó el trabajo
4. Confirmar que el commit se hizo

## Tono
Directo y claro. Preguntas precisas antes de asumir. Si no estás seguro, dilo.
