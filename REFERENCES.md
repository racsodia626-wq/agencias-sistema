# REFERENCES.md

> Última actualización: abril 2026
> Este documento refleja el estado actual de las referencias del proyecto — actualizar cuando se agreguen nuevas.

## Referencias visuales y estéticas

Lo que extraigo de estas referencias es el uso de tecnología visible dentro de la ciencia ficción — no la narrativa específica de cada una, sino cómo la tecnología se convierte en lenguaje y en espacio.

**Gamer (2009)**
Una persona siendo controlada — es el avatar de un jugador en alguna parte del mundo. La relación de control es literal y corporal. El cuerpo del performer es el avatar. La tecnología es el intermediario entre quien decide y quien ejecuta. Referencia central para AGENCIAS.

**Doom (videojuego)**
Interfaz mínima y funcional. El HUD que no estorba. La sensación de avanzar por un espacio desconocido con información limitada. Estética oscura con detalles de luz.

**Maze Runner (saga)**
El espacio como sistema de reglas que el cuerpo tiene que aprender a leer. El laberinto no como decoración sino como estructura que determina qué es posible.

**Blade Runner**
Tecnología que convive con lo humano sin resolverse. Estética: oscuro, luces de neón sobre superficies industriales.

**Portal (videojuego)**
La relación entre el jugador y un sistema que tiene sus propias reglas. El espacio como puzzle. La sensación de que el sistema te observa mientras tú lo usas.

Uso en AGENCIAS: estética tecnológica visible y funcional — interfaces que se ven como interfaces, no como decoración. Cyberpunk, retrofuturismo, ciencia ficción. Tecnología legible, no espectacular.

## Referencias de interfaz y HUD

**Dead Space**
El HUD integrado al cuerpo del personaje — la información no interrumpe el espacio visual, forma parte de él. Referencia para cómo los controles de AGENCIAS se superponen sobre el video sin partirlo ni dominarlo.

**Zelda — última entrega**
Diseño de interfaz limpio, iconografía clara, elementos que aparecen solo cuando son necesarios. Referencia para el sistema de desbloqueo progresivo de comandos y la legibilidad de los botones.

## Referencias de diseño de interacción

**Desbloqueo progresivo — Overcooked**
Los botones aparecen uno por uno conforme se aprenden. Al final el control completo es visible en pantalla. Referencia directa para cómo AGENCIAS desbloquea los 8 comandos en secuencia — cada uno aparece en su posición hasta armar el control completo.

**Botón bloqueado — Street Fighter / FPS con slots de armas**
Personajes o slots bloqueados visualmente claros — se entiende que no están disponibles sin ser frustrante. Referencia para el feedback visual y sonoro de botones bloqueados en AGENCIAS.

**Tutorial que no parece tutorial — Overcooked, Mario Kart**
No es que no expliquen — es que lo descubres intuitivamente. Se siente bien porque vas descubriendo algo y pruebas qué tanto puedes hacer con solo esa opción disponible. Referencia para el flujo de descubrimiento del controlador en AGENCIAS — sin instrucciones explícitas.

**Tono continuo de comando — referencia sonora**
No viene de un juego específico sino de la lógica del avatar: el sonido que emite el avatar indica que la acción continúa — como el motor de un carro en un juego de carreras. En AGENCIAS el performer necesita detectar que la instrucción sigue activa. La voz del comando es suficiente pero el sonido continuo es apoyo adicional esencial. El sonido viene del sistema, no del performer.

**Tensión entre quien manda y quien ejecuta — Gamer (2009)**
La película captura exactamente la pregunta central de AGENCIAS: ¿qué ocurre con la responsabilidad cuando alguien controla a otro? ¿Quién tiene el poder — el que decide o el que ejecuta?

## Referencias conceptuales

**Passing Through — David Zambrano**
Práctica de movimiento e improvisación donde los participantes se pasan impulsos entre sí. El movimiento viaja de cuerpo en cuerpo sin que nadie lo inicie conscientemente. La duración de cada sesión es abierta — no hay tiempo definido de exploración.

En AGENCIAS: todos los comandos funcionan para jugar Passing Through digitalmente. Con 2 performers y 2 controladores, el impulso viaja de cuerpo a cuerpo mediado por el sistema. La pregunta: ¿qué le pasa al movimiento cuando un sistema externo lo media?

Conexión directa con David Zambrano — director de TicTac Art Center Bruselas, residencia confirmada julio 2026.

**Los 3 roles**
- Controlador — emite comandos desde la interfaz digital
- Performer — ejecuta los comandos en el espacio físico con su cuerpo
- Sistema — define las reglas, los obstáculos, la estructura de cada nivel

El control no es fijo — puede rotar, compartirse o cruzarse entre los roles.

**Pregunta central**
¿Cómo se manifiesta la agencia del cuerpo cuando es guiado, condicionado o controlado por sistemas externos? ¿Qué ocurre con la responsabilidad cuando alguien controla a otro?

## Recursos técnicos

**Repo anterior — referencia histórica**
github.com/racsodia626-wq/agencies-choreography-system

Contiene código que funcionó en su momento y puede usarse como referencia técnica para:
- Sistema WebRTC con PeerJS — la conexión entre dispositivos funcionaba correctamente
- Web Speech API — voz en español funcionaba
- Web Audio API — síntesis de sonidos funcionaba

Advertencia: el sistema de audio fue modificado durante el desarrollo y dejó de funcionar. Si se usa como referencia, verificar que el AudioContext se crea dentro del gesto del usuario — esa es la condición crítica. No copiar código sin revisar primero.

**Repo nuevo**
github.com/racsodia626-wq/agencias-sistema

**Librerías usadas en repo anterior — solo referencia**
- PeerJS 1.5.1 — WebRTC entre dispositivos
- Web Speech API — voz en español (nativo del navegador)
- Web Audio API — síntesis de sonidos (nativo del navegador)
- TensorFlow.js + pose-detection — detección corporal (problema pendiente)
- Three.js r128 — exploración 3D (descartado por ahora)

## Assets

### Assets de la app

**Silueta SVG del performer**
Descartada. Con la cámara en primera persona (POV) ya no hay cuerpo del performer visible en el encuadre — la silueta de posicionamiento no aplica. La detección se hace con manos (palmas y dorso), no con cuerpo completo.

**Sonidos de cada comando**
Creados — voces en .m4a + efectos de sonido en public/app/sounds/commands/. Descripción completa en CLAUDE.md sección Sistema de audio.

**Iconos y símbolos de botones**
Por definir — explorar símbolos universales multiidioma.

**Efectos visuales**
Por definir durante el desarrollo.

### Assets de la página de presentación
- Foto del artista en TicTac Art Center (Arnaud Beelen): por agregar link
- Teaser Sabor Fresa: https://youtu.be/J9cb77vgWho
- Textos ES/EN: existentes, por migrar al nuevo repo
- Dossier AGENCIAS: por crear

### Assets de producción y documentación
Google Drive: https://drive.google.com/drive/folders/1PkWehD64utOiHzuuUVJTMOLXFWgQqMAw

Estructura:
- /videos — sesiones de laboratorio, pruebas, teaser
- /fotos — pruebas, residencias, proceso
- /sesiones — registros de sesión (también en session-notes/ del repo)
