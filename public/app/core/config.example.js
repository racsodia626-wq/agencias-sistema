// Credenciales TURN — Metered.ca
// Copiar este archivo como config.js y reemplazar los placeholders con credenciales reales
// config.js NO se commitea — este archivo SÍ
const TURN_USERNAME = 'TU_USERNAME_AQUI';
const TURN_CREDENTIAL = 'TU_CREDENTIAL_AQUI';

const ICE_SERVERS = [
  { urls: 'stun:stun.relay.metered.ca:80' },
  { urls: 'turn:global.relay.metered.ca:80',   username: TURN_USERNAME, credential: TURN_CREDENTIAL },
  { urls: 'turn:global.relay.metered.ca:80?transport=tcp', username: TURN_USERNAME, credential: TURN_CREDENTIAL },
  { urls: 'turn:global.relay.metered.ca:443',  username: TURN_USERNAME, credential: TURN_CREDENTIAL },
  { urls: 'turns:global.relay.metered.ca:443?transport=tcp', username: TURN_USERNAME, credential: TURN_CREDENTIAL }
];

// Configuración PeerJS
const PEER_CONFIG = {
  host: '0.peerjs.com',
  port: 443,
  path: '/',
  secure: true,
  config: { iceServers: ICE_SERVERS }
};
