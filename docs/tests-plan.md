# tests-plan.md

> Plan de pruebas del proyecto.
> Cada cambio dispara una serie de pruebas específicas.
> Marcar resultado en cada prueba: ✓ pasa, ✗ falla, — no aplica.

---

## Antes de cualquier sesión de pruebas

- [ ] Dos dispositivos disponibles: celular + laptop o dos celulares
- [ ] Ambos dispositivos en la misma red WiFi (para pruebas locales) o con internet (para Vercel)
- [ ] Audífonos bluetooth conectados al celular del performer
- [ ] Volumen al máximo en ambos dispositivos
- [ ] Última versión deployada o servidor local activo

---

## Pruebas básicas — después de cualquier cambio

### Conexión
- [ ] Performer puede entrar a CÁMARA y se activa la cámara trasera
- [ ] La app genera un código de sala visible
- [ ] El código se puede copiar con un toque
- [ ] Controlador puede ingresar el código y conectarse
- [ ] La luz de status cambia correctamente: ROJO → NARANJA → VERDE
- [ ] Si la conexión se cae, aparece mensaje de error claro

### Video
- [ ] El controlador ve el video del performer en tiempo real
- [ ] El video aparece desenfocado antes de la detección
- [ ] El video se aclara después de la detección
- [ ] El video no tiene efecto espejo (cámara trasera)

### Audio del performer
- [ ] El performer escucha la voz del comando cuando el controlador presiona un botón
- [ ] El performer escucha el sonido específico de cada comando
- [ ] AVANZA y RETROCEDE: el tono continuo suena mientras se mantiene presionado
- [ ] AVANZA y RETROCEDE: el tono se detiene al soltar el botón
- [ ] El audio funciona en celular con audífonos bluetooth

### Audio del controlador
- [ ] El controlador escucha el audio del espacio del performer desde el momento de conectar
- [ ] El audio del espacio del performer se mantiene activo durante toda la sesión

### Detección corporal
- [ ] La silueta aparece sobre el video del performer al conectar
- [ ] El mensaje "DETECTANDO PERFORMER" es visible
- [ ] La barra de carga aparece cuando el cuerpo se posiciona en la silueta
- [ ] Si el performer se mueve, el contador reinicia
- [ ] A los 4 segundos en posición, la silueta cambia a verde y desaparece
- [ ] El controlador recibe el aviso de detección — la luz cambia a VERDE

### Tutorial — desbloqueo de comandos
- [ ] Solo aparece el primer comando AVANZA visible al inicio
- [ ] Los demás botones aparecen bloqueados y oscuros
- [ ] Al presionar un botón bloqueado, suena el feedback de error
- [ ] Al usar AVANZA correctamente, se desbloquea el siguiente comando
- [ ] La secuencia se cumple: AVANZA → GIRA IZQ → GIRA DER → RETROCEDE → SALTA → AGÁCHATE → RODAR → STOP
- [ ] Al completar los 8, aparece la pantalla intermedia

### Pausa y reinicio
- [ ] El controlador puede pausar la sesión
- [ ] La luz cambia a AMARILLO en ambos dispositivos
- [ ] El performer escucha "STAND BY"
- [ ] Al reiniciar, vuelve al inicio del tutorial

---

## Pruebas específicas por tipo de cambio

### Si cambió código de audio
- Repetir todas las pruebas de "Audio del performer" y "Audio del controlador"
- Probar específicamente en móvil — no solo desktop
- Probar con y sin audífonos bluetooth

### Si cambió código de conexión WebRTC
- Repetir todas las pruebas de "Conexión"
- Probar en redes diferentes (no solo misma WiFi)
- Probar la reconexión después de caída

### Si cambió código de detección corporal
- Repetir todas las pruebas de "Detección corporal"
- Probar con diferentes performers (estaturas, ropa)
- Probar con luz baja y luz alta del espacio

### Si cambió código de tutorial o niveles
- Repetir todas las pruebas de "Tutorial — desbloqueo de comandos"
- Probar el flujo completo de inicio a fin

---

## Plantilla para nuevas pruebas

Cuando se agregue una funcionalidad nueva, agregar aquí:

### Nombre de la funcionalidad
- [ ] Comportamiento esperado 1
- [ ] Comportamiento esperado 2
- [ ] Caso límite o de error
