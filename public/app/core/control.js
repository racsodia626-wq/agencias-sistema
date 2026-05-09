// ─── Catálogo de los 8 comandos ───────────────────────────────────────────────

const COMMANDS = [
  { id: 'AVANZA',    label: 'AVANZA',    symbol: '▲', group: 'nav',    color: '#00D4FF', continuous: true,  freq: 120 },
  { id: 'RETROCEDE', label: 'RETROCEDE', symbol: '▼', group: 'nav',    color: '#00D4FF', continuous: true,  freq: 440 },
  { id: 'GIRA IZQ',  label: 'GIRA IZQ', symbol: '◄', group: 'nav',    color: '#00D4FF', continuous: false },
  { id: 'GIRA DER',  label: 'GIRA DER', symbol: '►', group: 'nav',    color: '#00D4FF', continuous: false },
  { id: 'SALTA',     label: 'SALTA',    symbol: '✦', group: 'action', color: '#00FF88', continuous: false },
  { id: 'AGACHATE',  label: 'AGÁCHATE', symbol: '◆', group: 'action', color: '#FFB800', continuous: false },
  { id: 'RODAR',     label: 'RODAR',    symbol: '↺', group: 'action', color: '#AA88FF', continuous: false },
  { id: 'STOP',      label: 'STOP',     symbol: '■', group: 'action', color: '#FF3366', continuous: false },
];

// ─── Estado interno ───────────────────────────────────────────────────────────

let _audioCtx         = null;
let _activeOscillator = null; // oscilador activo para tonos continuos (AVANZA, RETROCEDE)
let _spanishVoice     = null; // voz en español seleccionada

// ─── Inicialización ───────────────────────────────────────────────────────────

function initControl(audioCtx) {
  _audioCtx = audioCtx;
  _selectSpanishVoice();
}

// ─── Voz — Web Speech API ─────────────────────────────────────────────────────

function _selectSpanishVoice() {
  // getVoices() puede estar vacío al cargar — se rellena de forma asíncrona
  const trySelect = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;
    _spanishVoice =
      voices.find(v => v.lang === 'es-MX') ||
      voices.find(v => v.lang === 'es-ES') ||
      voices.find(v => v.lang.startsWith('es')) ||
      null;
  };
  trySelect();
  window.speechSynthesis.addEventListener('voiceschanged', trySelect);
}

function _playVoice(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-MX';
  utterance.rate = 1.1;
  if (_spanishVoice) utterance.voice = _spanishVoice;
  window.speechSynthesis.speak(utterance);
}

// ─── Sonidos — Web Audio API ──────────────────────────────────────────────────

function _startContinuousSound(freq) {
  if (!_audioCtx || _activeOscillator) return;
  const osc  = _audioCtx.createOscillator();
  const gain = _audioCtx.createGain();
  osc.type            = 'sine';
  osc.frequency.value = freq;
  // Fade in suave para evitar click de inicio
  gain.gain.setValueAtTime(0, _audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, _audioCtx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(_audioCtx.destination);
  osc.start();
  _activeOscillator = { osc, gain };
}

function _stopContinuousSound() {
  if (!_audioCtx || !_activeOscillator) return;
  const { osc, gain } = _activeOscillator;
  const t = _audioCtx.currentTime;
  // Fade out para evitar click de corte
  gain.gain.linearRampToValueAtTime(0, t + 0.06);
  osc.stop(t + 0.07);
  _activeOscillator = null;
}

function _playClick() {
  if (!_audioCtx) return;
  const osc  = _audioCtx.createOscillator();
  const gain = _audioCtx.createGain();
  osc.type            = 'sine';
  osc.frequency.value = 900;
  gain.gain.setValueAtTime(0.5, _audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(_audioCtx.destination);
  osc.start();
  osc.stop(_audioCtx.currentTime + 0.05);
}

function _playPoing() {
  // Barrido ascendente 200→800 Hz — SALTA
  if (!_audioCtx) return;
  const osc  = _audioCtx.createOscillator();
  const gain = _audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, _audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, _audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.4, _audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + 0.35);
  osc.connect(gain);
  gain.connect(_audioCtx.destination);
  osc.start();
  osc.stop(_audioCtx.currentTime + 0.35);
}

function _playTick() {
  // Barrido descendente 600→80 Hz — AGÁCHATE
  if (!_audioCtx) return;
  const osc  = _audioCtx.createOscillator();
  const gain = _audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, _audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, _audioCtx.currentTime + 0.22);
  gain.gain.setValueAtTime(0.4, _audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + 0.25);
  osc.connect(gain);
  gain.connect(_audioCtx.destination);
  osc.start();
  osc.stop(_audioCtx.currentTime + 0.25);
}

function _playRumble() {
  // Ruido blanco filtrado paso-bajo — RODAR
  if (!_audioCtx) return;
  const duration   = 0.5;
  const bufferSize = Math.floor(_audioCtx.sampleRate * duration);
  const buffer     = _audioCtx.createBuffer(1, bufferSize, _audioCtx.sampleRate);
  const data       = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = _audioCtx.createBufferSource();
  source.buffer = buffer;
  const filter = _audioCtx.createBiquadFilter();
  filter.type            = 'lowpass';
  filter.frequency.value = 90;
  const gain = _audioCtx.createGain();
  gain.gain.setValueAtTime(0.7, _audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(_audioCtx.destination);
  source.start();
  source.stop(_audioCtx.currentTime + duration);
}

function _playStopSound() {
  // Ruido corto con caída abrupta — STOP
  if (!_audioCtx) return;
  const duration   = 0.07;
  const bufferSize = Math.floor(_audioCtx.sampleRate * duration);
  const buffer     = _audioCtx.createBuffer(1, bufferSize, _audioCtx.sampleRate);
  const data       = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // amplitud decae rápido — efecto de corte brusco
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = _audioCtx.createBufferSource();
  source.buffer = buffer;
  const gain = _audioCtx.createGain();
  gain.gain.setValueAtTime(0.9, _audioCtx.currentTime);
  source.connect(gain);
  gain.connect(_audioCtx.destination);
  source.start();
}

function _playSound(cmd) {
  switch (cmd.id) {
    case 'AVANZA':    _startContinuousSound(cmd.freq); break;
    case 'RETROCEDE': _startContinuousSound(cmd.freq); break;
    case 'GIRA IZQ':
    case 'GIRA DER':  _playClick();     break;
    case 'SALTA':     _playPoing();     break;
    case 'AGACHATE':  _playTick();      break;
    case 'RODAR':     _playRumble();    break;
    case 'STOP':      _playStopSound(); break;
  }
}

// ─── Data channel ─────────────────────────────────────────────────────────────

function _sendCommand(id, state) {
  // 'connection' es la variable global del data channel definida en nivel-01.html
  if (typeof connection !== 'undefined' && connection && connection.open) {
    connection.send({ type: 'command', id, state });
  }
}

// ─── Handlers de press y release ──────────────────────────────────────────────

function _onPress(cmd, btnEl) {
  _playVoice(cmd.label);
  _playSound(cmd);
  _sendCommand(cmd.id, cmd.continuous ? 'start' : 'trigger');
  btnEl.classList.add('active');
  _showActiveSymbol(cmd);
}

function _onRelease(cmd, btnEl) {
  if (cmd.continuous) {
    _stopContinuousSound();
    _sendCommand(cmd.id, 'end');
  }
  btnEl.classList.remove('active');
  _hideActiveSymbol();
}

// ─── Símbolo activo en pantalla ───────────────────────────────────────────────

function _showActiveSymbol(cmd) {
  const el = document.getElementById('ctrl-active-symbol');
  if (!el) return;
  el.textContent = cmd.symbol;
  el.style.color = cmd.color;
  el.classList.add('visible');
}

function _hideActiveSymbol() {
  const el = document.getElementById('ctrl-active-symbol');
  if (el) el.classList.remove('visible');
}

// ─── Creación de botón individual ────────────────────────────────────────────

function _createButton(cmd) {
  const btn = document.createElement('button');
  btn.className         = 'ctrl-btn';
  btn.style.color       = cmd.color;
  btn.style.borderColor = cmd.color;
  btn.innerHTML = `<span class="btn-symbol">${cmd.symbol}</span><span class="btn-label">${cmd.label}</span>`;

  // Touch — preventDefault evita que también dispare mousedown en móvil
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    _onPress(cmd, btn);
  }, { passive: false });

  btn.addEventListener('touchend', (e) => {
    e.preventDefault();
    _onRelease(cmd, btn);
  }, { passive: false });

  btn.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    _onRelease(cmd, btn);
  }, { passive: false });

  // Mouse — para pruebas en desktop
  btn.addEventListener('mousedown', () => _onPress(cmd, btn));
  btn.addEventListener('mouseup',   () => _onRelease(cmd, btn));
  btn.addEventListener('mouseleave', () => {
    // Si el mouse sale del botón mientras está presionado
    if (btn.classList.contains('active')) _onRelease(cmd, btn);
  });

  return btn;
}

// ─── Render de controles ──────────────────────────────────────────────────────

function renderControls() {
  _injectCSS();

  const overlay = document.createElement('div');
  overlay.id = 'ctrl-overlay';

  // Símbolo grande que aparece al presionar — solo el símbolo, no el texto
  const activeSymbol = document.createElement('div');
  activeSymbol.id = 'ctrl-active-symbol';
  overlay.appendChild(activeSymbol);

  // Dpad izquierdo — cruz: AVANZA arriba, GIRA IZQ y DER a los lados, RETROCEDE abajo
  const dpad = document.createElement('div');
  dpad.className = 'ctrl-dpad';

  const dpadLayout = [
    null,       'AVANZA',    null,
    'GIRA IZQ', null,        'GIRA DER',
    null,       'RETROCEDE', null,
  ];

  dpadLayout.forEach(id => {
    if (!id) {
      const empty = document.createElement('div');
      empty.className = 'ctrl-btn ctrl-btn--empty';
      dpad.appendChild(empty);
      return;
    }
    const cmd = COMMANDS.find(c => c.id === id);
    dpad.appendChild(_createButton(cmd));
  });

  // Botones de acción derecha — 2×2: SALTA, AGÁCHATE, RODAR, STOP
  const actions = document.createElement('div');
  actions.className = 'ctrl-actions';

  ['SALTA', 'AGACHATE', 'RODAR', 'STOP'].forEach(id => {
    const cmd = COMMANDS.find(c => c.id === id);
    actions.appendChild(_createButton(cmd));
  });

  overlay.appendChild(dpad);
  overlay.appendChild(actions);
  document.body.appendChild(overlay);
}

// ─── CSS inyectado — se llama una sola vez ────────────────────────────────────

function _injectCSS() {
  if (document.getElementById('ctrl-styles')) return;
  const style = document.createElement('style');
  style.id = 'ctrl-styles';
  style.textContent = `
    #ctrl-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 50;
    }

    /* Dpad en esquina inferior izquierda */
    .ctrl-dpad {
      position: absolute;
      bottom: 24px;
      left: 16px;
      display: grid;
      grid-template-columns: repeat(3, 68px);
      grid-template-rows: repeat(3, 68px);
      gap: 4px;
      pointer-events: all;
    }

    /* Acciones en esquina inferior derecha */
    .ctrl-actions {
      position: absolute;
      bottom: 24px;
      right: 16px;
      display: grid;
      grid-template-columns: repeat(2, 68px);
      grid-template-rows: repeat(2, 68px);
      gap: 4px;
      pointer-events: all;
    }

    .ctrl-btn {
      background: rgba(5, 8, 16, 0.55);
      border: 1px solid currentColor;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      font-family: 'Rajdhani', sans-serif;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.08s ease;
    }

    .ctrl-btn.active {
      background: rgba(255, 255, 255, 0.15);
    }

    .ctrl-btn--empty {
      background: transparent !important;
      border: none !important;
      pointer-events: none;
    }

    .btn-symbol {
      font-size: 22px;
      line-height: 1;
    }

    .btn-label {
      font-size: 8px;
      opacity: 0.75;
    }

    /* Símbolo grande al centro — aparece al presionar, oculto por defecto */
    #ctrl-active-symbol {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Rajdhani', sans-serif;
      font-size: 140px;
      font-weight: 600;
      line-height: 1;
      opacity: 0;
      transition: opacity 0.05s ease;
      pointer-events: none;
    }

    #ctrl-active-symbol.visible {
      opacity: 0.85;
    }
  `;
  document.head.appendChild(style);
}
