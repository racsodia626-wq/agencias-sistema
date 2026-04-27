# prompts.md

> Biblioteca de prompts reutilizables para Claude Code.
> Cada prompt está probado y funciona — copiar y pegar.
> Agregar prompts nuevos cuando se descubran que funcionan bien.

---

## Inicio de sesión

```
Lee CLAUDE.md, CONTEXT.md, REFERENCES.md y VISION.md. 
Resume en 3 líneas qué está funcionando, qué está pendiente, 
y por dónde sugieres empezar hoy.
```

---

## Cierre de sesión — palabra clave /pausa

```
/pausa
```

Esto activa el flujo de cierre definido en CLAUDE.md:
1. Commit de todo lo pendiente
2. Actualizar trabajo pendiente en CONTEXT.md
3. Resumir dónde quedó el trabajo
4. Confirmar commit hecho

---

## Crear archivo nuevo respetando arquitectura

```
Crea el archivo [ruta/nombre.html] siguiendo la estética y 
estructura definida en CLAUDE.md. Debe usar HTML puro sin 
frameworks. Antes de escribir, dime qué vas a incluir y 
espera mi aprobación.
```

---

## Agregar funcionalidad sin reescribir

```
En [archivo] agrega [funcionalidad nueva]. 
Reglas:
- Copia el archivo completo sin modificar nada existente
- Agrega solo las líneas nuevas necesarias
- Avísame exactamente qué líneas agregaste y dónde
- Si necesitas reescribir más de 20 líneas existentes, 
  pausa y pregúntame antes de continuar
```

---

## Depurar problema

```
[Descripción del problema observado en dispositivo real]

Antes de modificar código:
1. Dime qué archivo y qué líneas crees que están causando el problema
2. Explícame por qué crees que ese es el origen
3. Espera mi confirmación antes de hacer cambios
```

---

## Probar en red local

```
Configura el servidor local con HTTPS para que pueda probar 
la app entre mi laptop y mi celular en la misma red WiFi. 
Dame el comando exacto para iniciarlo y la URL que debo 
abrir en cada dispositivo.
```

---

## Hacer commit con descripción clara

```
Haz commit de los cambios actuales. 
Mensaje del commit en español, corto, describe qué cambió 
y por qué — no qué archivos se modificaron.
```

---

## Crear tag de versión funcional

```
Crea un tag de git v[número] en el commit actual con 
descripción "[descripción de qué funciona en esta versión]". 
Sube el tag al repositorio.
```

---

## Documentar decisión técnica

```
Acabo de decidir [decisión]. 
Agrega esta decisión a decisions.md con fecha de hoy, 
las alternativas que consideramos, y la razón.
```

---

## Agregar comando nuevo al sistema

```
Quiero agregar el comando [NOMBRE] al sistema.
Antes de escribir código:
1. Confirma dónde se agrega — qué archivos se tocan
2. Explica cómo se integra con los 8 comandos existentes
3. Dime qué sonido y voz tendrá según el patrón de CLAUDE.md
4. Espera mi aprobación antes de modificar cualquier archivo
```

---

## Crear nuevo nivel

```
Quiero diseñar el nivel [número/nombre].
Antes de empezar:
1. Léeme la sección "Niveles" de CONTEXT.md
2. Confirma si los obstáculos están resueltos — si no, recuérdame que el diseño de niveles depende de eso
3. Pregúntame qué mecánica nueva introduce este nivel
4. Espera mi descripción antes de escribir nada
```

---

## Plantilla para nuevos prompts

### Nombre del prompt

```
[El prompt aquí]
```

Notas: cuándo usarlo, qué problema resuelve, ejemplo de cuándo NO usarlo.
