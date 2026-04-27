# CONTEXT.md

> Última actualización: 2026-04-26
> Este documento refleja el estado actual del proyecto — actualizar cuando algo cambie.

## Qué es AGENCIAS
Sistema coreográfico experimental que usa lógica de videojuegos como estructura performativa. Un controlador emite comandos digitales, un performer los ejecuta en el espacio físico. La pregunta central: ¿cómo se manifiesta la agencia del cuerpo cuando es guiado por sistemas externos?

## Los 8 comandos — catálogo actual
AVANZA → GIRA IZQ → GIRA DER → RETROCEDE → SALTA → AGÁCHATE → RODAR → STOP

El catálogo es fijo por ahora. A futuro pueden agregarse comandos nuevos o explorarse combinaciones de comandos. No modificar sin consultar.

## Arquitectura de archivos

public/
├── app/
│   ├── index.html — pantalla de inicio: elegir CÁMARA o CONTROLADOR
│   ├── core/
│   │   └── camera.html — dispositivo del performer
│   └── levels/
│       └── nivel-01.html — tutorial + primer nivel
└── (página de presentación — arquitectura por confirmar)

Nota: no existe control.html — se eliminó. Todo parte desde index.html.

## Pantalla de inicio — index.html
Minimalista. Contiene:
- Nombre del proyecto: AGENCIAS
- Línea descriptiva corta
- Nombre del creador y año
- Dos botones: CÁMARA y CONTROLADOR

## Flujo completo de una sesión

### PERFORMER — camera.html
1. Entra a index.html → selecciona CÁMARA
2. La app genera un código de sala de 5 letras
3. La cámara trasera se activa — el performer ve lo que graba
4. Luz de status: ROJO — sin controlador conectado
5. El controlador ingresa el código → luz cambia a NARANJA
6. Aparece silueta de cuerpo humano de sexo indefinido — estilo señalética de sanitario o señal de piso mojado — con mensaje "DETECTANDO PERFORMER"
7. El performer se posiciona hasta llenar la silueta
8. Cuando el cuerpo es detectado → luz cambia a VERDE → el juego puede comenzar
9. Durante la sesión: el performer solo escucha — voz del comando + sonido específico
10. El performer no sabe en qué nivel está ni qué comando viene después
11. Si sale del cuadro antes de ser detectado: el juego no inicia
12. Si sale del cuadro después de ser detectado: no hay consecuencia por ahora
13. Solo el controlador puede pausar, salir o reiniciar — el performer es expulsado o puesto en stand by

### CONTROLADOR — nivel-01.html
1. Entra a index.html → selecciona CONTROLADOR
2. Ingresa el código de sala del performer
3. Ve la cámara del performer ligeramente desenfocada con la silueta superpuesta
4. Luz de status: NARANJA — esperando detección del performer
5. Escucha el audio del espacio del performer en todo momento
6. Cuando el performer es detectado → pantalla se aclara → luz cambia a VERDE
7. Aparece el primer comando AVANZA — los demás bloqueados y oscuros
8. El controlador presiona AVANZA — performer escucha voz + sonido
9. El controlador descubre solo qué hace cada comando explorando — no hay instrucciones
10. Botones bloqueados: feedback de audio al presionar — sonido de bloqueo
11. Al usar un comando se desbloquea el siguiente en su posición del control
12. El control se arma comando por comando hasta tener los 8 completos
13. Al completar los 8 → pantalla intermedia con nombre y descripción del nivel
14. Empieza Nivel 01

## Código de sala
- El performer ve el código en su pantalla
- Puede copiarlo con un toque para compartirlo por WhatsApp u otro medio
- El controlador lo ingresa manualmente en su pantalla

## Detección corporal — tiempo de confirmación
- 4 segundos en posición continua para confirmar detección
- Barra de carga visible con contador durante esos 4 segundos
- El performer entiende que debe quedarse quieto por ese tiempo
- Si se mueve antes de completar los 4 segundos: el contador reinicia

## Audio del controlador
- Activo desde el momento que conecta con el código de sala
- No espera a que el performer sea detectado

## Pausa
- El controlador pausa la sesión
- El performer escucha un audio: voz "STAND BY"
- La luz de status cambia a AMARILLO en ambos dispositivos
- Dejan de llegar comandos al performer

## Reinicio
- Vuelve al inicio del tutorial completo
- El performer es notificado — por definir cómo

## Luz de status — visible para ambos dispositivos
- ROJO — performer sin controlador conectado
- NARANJA — controlador conectado, esperando detección
- VERDE — performer detectado, sistema activo
- AMARILLO — sesión en pausa

## Control de videojuego — layout
- Izquierda: dpad con AVANZA, RETROCEDE, GIRA IZQ, GIRA DER
- Derecha: botones de acción SALTA, AGÁCHATE, RODAR, STOP
- Cada botón tiene texto + símbolo
- Al presionar un comando: solo aparece el símbolo en pantalla — no el texto
- Controles transparentes superpuestos sobre el video — no parten la pantalla
- Botones bloqueados: oscuros, sin color, sonido de bloqueo al presionar

## Estética visual — app
- Fondo: #050810
- Tipografía: Share Tech Mono + Rajdhani
- Color principal: #00D4FF
- Paleta de comandos:
  - Navegación: #00D4FF
  - SALTA: #00FF88
  - AGÁCHATE: #FFB800
  - RODAR: #AA88FF
  - STOP: #FF3366

## Estética visual — página de presentación
Variaciones de color respecto a la app. Por definir cuando se trabaje en ella.

## Página de presentación
- Vive en el mismo repo que la app
- Desde la página se puede entrar a la app directamente
- Colores y estética: variaciones respecto a la app — por definir al trabajar en ella

## Obstáculos
Pendiente de resolver. La cámara en ángulo fijo dificulta el diseño. Se resolverá al implementar cámara en primera persona. No construir obstáculos ni diseñar niveles hasta tener esa solución — los niveles dependen directamente de los obstáculos.

## Símbolos en lugar de texto
Idea abierta — explorar símbolos universales para los comandos considerando multiidioma: español, inglés, alemán. Pendiente de definir.

## Niveles
- Tutorial: descubrimiento de los 8 comandos sin instrucciones — el controlador explora
- Pantalla intermedia entre tutorial y cada nivel: nombre + descripción — por definir
- Nivel 01 y siguientes: por definir — dependen de resolver los obstáculos

## Conexión WebRTC
- Librería: PeerJS 1.5.1
- TURN servers: Metered.ca — ver archivo .env, nunca subir a GitHub
- ID de sala: 'agencias-cam-' + código de 5 letras — formato idéntico en camera.html y nivel-01.html

### Mensajes del data channel
Protocolo de comunicación entre los dos dispositivos. Los nombres pueden cambiar durante el desarrollo — actualizar esta sección cuando cambien.

- Del performer al controlador: aviso de que el cuerpo fue detectado
- Del controlador al performer: cada comando con su texto, sonido y color

Los nombres exactos de los mensajes se definen y documentan aquí cuando se construyan los archivos.

### Regla de oro
Cualquier cambio que afecte la conexión debe reflejarse en ambos archivos. Nunca modificar uno sin revisar el otro.

## Manejo de errores de conexión
- Si la conexión se cae: mensaje de error visible en ambos dispositivos
- El mensaje indica dónde ocurrió la falla
- Opción de reiniciar desde el punto de falla

## Espacio físico
- No hay tamaño mínimo requerido
- Recomendable: espacio abierto sin obstáculos físicos
- El performer necesita espacio suficiente para ejecutar los 8 comandos

## Orientación del performer
Pendiente de resolver — se definirá al implementar cámara en primera persona.

## Múltiples performers
No disponible en versión actual. A futuro: dos performers con dos controladores — ver VISION.md.

## Sesiones de laboratorio
Las observaciones se documentan en session-notes/ — un archivo por sesión.

### Formato de cada sesión
- Fecha y lugar
- Nombre del performer y del controlador
- Tests realizados
- Comentarios individuales de cada participante según su rol
- Discusión en torno al evento
- Preguntas preparadas previamente — varían según el rol
- Preguntas que surgieron en el momento
- Notas sobre lo que estaba pasando en tiempo real
- Preguntas futuras y réplicas a comentarios

## Trabajo pendiente
- [x] Crear estructura base del proyecto — hecho 2026-04-26
- [x] Conectar repo local a GitHub (racsodia626-wq/agencias-sistema) — hecho 2026-04-26
- [ ] Conectar repo a Vercel y confirmar URL
- [ ] Crear archivo .env con credenciales TURN (Metered.ca)
- [ ] Construir public/app/index.html — pantalla de inicio con botones CÁMARA y CONTROLADOR
- [ ] Construir public/app/core/camera.html — dispositivo del performer
- [ ] Construir public/app/levels/nivel-01.html — tutorial + primer nivel
- [ ] Audio en mobile — AudioContext debe crearse dentro del gesto del usuario
- [ ] Detección corporal — TensorFlow MoveNet tiene conflicto de backend webgpu
- [ ] Pantalla intermedia tutorial → Nivel 01 — contenido por definir
- [ ] Obstáculos — pendiente hasta resolver ángulo de cámara
- [ ] Definir símbolos universales para comandos
- [ ] Implementar cámara en primera persona

## Metas por semana
Semana 2: conexión funcional + audio funcionando + performer detectado — listo para probar con otra persona
Semana 4: tutorial completo con 8 comandos desbloqueándose — re-evaluar plan de niveles
Semana 8: sistema base usable en residencias, mostrable a públicos, mínimo 5 niveles

## Qué evitar
- Reescribir archivos que funcionan
- Construir obstáculos antes de resolver el ángulo de cámara
- Asumir que algo funciona sin probarlo en dispositivo real
- Acumular cambios sin hacer commit
- Subir credenciales al repositorio
