// Genera los 8 archivos de voz en español para los comandos de AGENCIAS.
// Usa `say` (macOS) para sintetizar voz y `afconvert` para convertir a MP3.
// Requiere macOS con la voz Paulina (es_MX) instalada.

const { execSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

const OUT_DIR = path.join(__dirname, 'public/app/sounds/commands');

const COMMANDS = [
  { file: 'avanza',    text: 'avanza'          },
  { file: 'retrocede', text: 'retrocede'        },
  { file: 'gira-izq',  text: 'gira a la izquierda' },
  { file: 'gira-der',  text: 'gira a la derecha'   },
  { file: 'salta',     text: 'salta'           },
  { file: 'agachate',  text: 'agáchate'        },
  { file: 'rodar',     text: 'rueda'           },
  { file: 'stop',      text: 'stop'            },
];

const VOICE = 'Paulina'; // es_MX — cambia a "Mónica" (es_ES) si Paulina no está instalada
const RATE  = 160;       // palabras por minuto — ajustar si suena muy rápido o lento

function generate() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  for (const cmd of COMMANDS) {
    const aiff = path.join(OUT_DIR, `${cmd.file}.aiff`);
    const m4a  = path.join(OUT_DIR, `${cmd.file}.m4a`);

    console.log(`Generando: ${cmd.file}.m4a → "${cmd.text}"`);

    // 1. Sintetizar voz a AIFF
    execSync(`say -v "${VOICE}" -r ${RATE} -o "${aiff}" "${cmd.text}"`);

    // 2. Convertir AIFF a M4A (AAC) — compatible con iOS Safari, Android Chrome y desktop
    execSync(`afconvert "${aiff}" "${m4a}" -d aac -f m4af`);

    // 3. Eliminar el AIFF temporal
    fs.unlinkSync(aiff);

    console.log(`  ✓ ${cmd.file}.m4a`);
  }

  console.log('\nListo. Archivos generados:');
  fs.readdirSync(OUT_DIR)
    .filter(f => f.endsWith('.m4a'))
    .forEach(f => console.log(`  public/app/sounds/commands/${f}`));
}

generate();
