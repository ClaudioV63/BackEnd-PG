//==================================================
// Configuracion del Sistema
//==================================================

// ===================================
// Puerto de la Aplicación
// ===================================
const puerto = 3010;
process.env.PORT = process.env.PORT || puerto.toString();
const PORT = process.env.PORT;

// ===================================
// Ruta de acceso a API
// ===================================

process.env.RUTA_API = process.env.RUTA_API || '/api';
const RUTA_API = process.env.RUTA_API;

// ===================================
// Entorno (Produccion o Desarrollo)
// ===================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===================================
// Vencimiento de Token
// ===================================

process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN  || '48h';
const CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN;

// ===================================
// SEED Autentificacion
// ===================================

process.env.SEED = process.env.SEED || 'mtc2151sistemas';
const SEED = process.env.SEED;

// ===================================
// Muesta logs
// ===================================

process.env.LOGS = process.env.LOGS || 'SI';
const LOGS = process.env.LOGS;

module.exports = {
    PORT,
    CADUCIDAD_TOKEN,
    SEED,
    RUTA_API,
    LOGS
}



