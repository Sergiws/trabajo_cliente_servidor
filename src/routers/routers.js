import express from 'express';
import { paginaInicio, paginaHorario } from '../controllers/horarioController.js'
import { paginaCalendario, calendarioDiferente } from '../controllers/calendarioController.js';
import { paginaReserva, gestionarPeticion } from '../controllers/reservaController.js';
import { paginaLogin, acceder } from '../controllers/loginController.js';
import { verificarAdmin, paginaAdmin, logout } from '../controllers/adminController.js';
import { paginaPeticionesPendientes, verPeticion, administrarPeticion, paginaHistorialPeticiones } from '../controllers/peticionController.js';

const router = express.Router();

router.get('/', paginaInicio);

router.get('/calendario', paginaCalendario);
router.post('/calendario', calendarioDiferente)

router.get('/horario', paginaHorario);

router.get('/reserva', paginaReserva);
router.post('/reserva', gestionarPeticion);

router.get('/login', paginaLogin);
router.post('/login', acceder);

router.get('/admin', verificarAdmin, paginaAdmin);

router.get('/logout', verificarAdmin, logout);

router.get('/peticiones_pendientes', verificarAdmin, paginaPeticionesPendientes);
router.post('/peticiones_pendientes', verificarAdmin, verPeticion);

router.post('/peticion', verificarAdmin, administrarPeticion);

router.get('/historial_peticiones', verificarAdmin, paginaHistorialPeticiones);
router.post('/historial_peticiones', verificarAdmin, verPeticion);

export default router;