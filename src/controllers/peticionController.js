import db from "../config/db.js";
import transporter from '../config/nodemailer.js';

const paginaPeticionesPendientes = async (req, res) => {
    try {
        // Obtener el número de página de los parámetros de la consulta
        const pagina = parseInt(req.query.pagina) || 1;
        const porPagina = 10; // Número de peticiones por página

        // Calcular el offset (desplazamiento) para la consulta SQL
        const offset = (pagina - 1) * porPagina;

        // Consulta SQL para obtener las peticiones pendientes con paginación
        const sql = `
            SELECT id_peticion, contacto, id_aula, fecha 
            FROM PETICION 
            WHERE ID_PETICION NOT IN (SELECT ID_PETICION FROM GESTION_PETICION)
            ORDER BY ID_PETICION ASC
            LIMIT ${porPagina} OFFSET ${offset}
        `;

        // Ejecutar la consulta
        const [peticiones, metadata] = await db.query(sql);

        // Consulta para obtener el total de peticiones pendientes (sin paginación)
        const countSql = `
            SELECT COUNT(*) as total 
            FROM PETICION 
            WHERE ID_PETICION NOT IN (SELECT ID_PETICION FROM GESTION_PETICION)
        `;
        const [totalPeticiones] = await db.query(countSql);
        const total = totalPeticiones[0].total;

        // Calcular el número total de páginas
        const totalPaginas = Math.ceil(total / porPagina);

        // Renderizar la vista con los datos de paginación
        res.render('peticiones_pendientes', {
            pagina: 'Peticiones pendientes',
            titulo: 'Peticiones pendientes',
            peticiones: peticiones,
            paginacion: {
                paginaActual: pagina,
                totalPaginas: totalPaginas,
                tieneAnterior: pagina > 1,
                tieneSiguiente: pagina < totalPaginas
            }
        });

    } catch (err) {
        res.render('error', {
            pagina: 'Error',
            titulo: '¡Algo fue mal!',
            mensaje: err
        });
    }
}

const verPeticion = async (req, res) => {
    const id = req.body.id;

    const sql = `
    SELECT peticion.id_peticion, id_aula, hora_inicio, hora_fin, fecha, contacto, admin.id_admin, correo, estado
    FROM peticion LEFT JOIN gestion_peticion
    ON peticion.id_peticion = gestion_peticion.id_peticion
    LEFT JOIN admin
    ON gestion_peticion.id_admin = admin.id_admin
    WHERE peticion.id_peticion=${id}`;

    try {
        const [peticiones, metadata] = await db.query(sql);

        res.render('peticion', {
            pagina: 'Peticion',
            titulo: 'Gestionar petición',
            peticion: peticiones[0]
        });

    } catch (err) {
        res.render('error', {
            pagina: 'Error',
            titulo: '¡Algo fue mal!',
            mensaje: err
        });
    }
}

const administrarPeticion = async (req, res) => {
    const estado = req.body.estado;
    const id_peticion = req.body.id;
    const contacto = req.body.contacto;

    //Averiguar el admin que gestiona la petición
    const sql = `SELECT id_admin FROM admin WHERE CORREO='${req.session.admin}'`;

    try {
        const [admin, metadata] = await db.query(sql);

        const sql2 = `INSERT INTO gestion_peticion (id_peticion, id_admin, estado) VALUES (${id_peticion}, ${admin[0].id_admin}, '${estado}')`;
        await db.query(sql2);

        const sql3 = `SELECT * FROM peticion WHERE id_peticion=${id_peticion}`;
        const [peticiones, metadata3] = await db.query(sql3);

        const peticion = peticiones[0];

        const sql4 = `
        INSERT INTO gestion_peticion (id_peticion, id_admin, estado)
        SELECT peticion.id_peticion, 4, 'RECHAZADA' FROM peticion
        WHERE fecha=${peticion.fecha} AND hora_inicio=${peticion.hora_inicio}
        `;
        await db.query(sql4);

        const color = 'ACEPTADA' === estado ? '#14A44D' : '#DC4C64';

        const ajustesMail = {
            from: '"New Art" <monos.bailongos@gmail.com>',
            to: contacto,
            subject: `Reserva ${estado} - New Art`,
            html: `
            <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f0f0; width: 100%; padding: 20px 0;">
                <div style="width: 100%; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: white; margin: 0 auto; width: 90%; border-radius: 5px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <div style="background-color: ${color}; color: white; padding: 20px; text-align: center;">
                            <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Reserva ${estado}</h2>
                        </div>

                        <div style="padding: 20px;">
                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Aula</label>
                                <input type="text" value="${peticion.id_aula}" readonly
                                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f9f9f9; color: #555; box-sizing: border-box;">
                            </div>

                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Hora de
                                    inicio</label>
                                <input type="text" value="${peticion.hora_inicio}" readonly
                                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f9f9f9; color: #555; box-sizing: border-box;">
                            </div>

                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Hora de
                                    fin</label>
                                <input type="text" value="${peticion.hora_fin}" readonly
                                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f9f9f9; color: #555; box-sizing: border-box;">
                            </div>

                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Fecha</label>
                                <input type="text" value="${peticion.fecha}" readonly
                                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f9f9f9; color: #555; box-sizing: border-box;">
                            </div>

                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Correo
                                    electrónico</label>
                                <input type="text" value="${peticion.contacto}" readonly
                                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f9f9f9; color: #555; box-sizing: border-box;">
                            </div>

                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Estado</label>
                                <input type="text" value="${estado}" readonly
                                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f9f9f9; color: #555; box-sizing: border-box;">
                            </div>
                        </div>
                    </div>

                    <div style="width: 90%; margin: 0 auto; text-align: center; padding: 15px 0; color: #555; font-size: 12px;">
                        <p style="margin: 0;">Para más información, contacte con el personal de la academia</p>
                    </div>
                </div>
            </div>
            `
        }

        transporter.sendMail(ajustesMail, (error, info) => {
            if (error) {
                res.render('Error', {
                    pagina: 'Error',
                    titulo: 'Error',
                    mensaje: error
                });
            }
        });

        res.render('peticion_gestionada', {
            pagina: 'Peticion Gestionada',
            titulo: `La petición ha sido ${estado}`,
            mensaje: `Se le ha enviado un correo a ${contacto}`
        })
    } catch (err) {
        res.render('Error', {
            pagina: 'Error',
            titulo: 'Error',
            mensaje: err
        });
    }
}

const paginaHistorialPeticiones = async (req, res) => {
    try {
        // Obtener el número de página de los parámetros de la consulta (query parameters)
        const pagina = parseInt(req.query.pagina) || 1; // Si no se proporciona, por defecto es la página 1
        const porPagina = 10; // Número de peticiones por página

        // Calcular el offset (desplazamiento) para la consulta SQL
        const offset = (pagina - 1) * porPagina;

        // Consulta SQL para obtener las peticiones del historial con paginación
        const sql = `
            SELECT peticion.id_peticion, contacto, id_aula, fecha, estado
            FROM peticion 
            INNER JOIN gestion_peticion ON peticion.id_peticion = gestion_peticion.id_peticion
            ORDER BY peticion.id_peticion DESC
            LIMIT ${porPagina} OFFSET ${offset}
        `;

        // Ejecutar la consulta
        const [peticiones, metadata] = await db.query(sql);

        // Consulta para obtener el total de peticiones en el historial (sin paginación)
        const countSql = `
            SELECT COUNT(*) as total
            FROM peticion 
            INNER JOIN gestion_peticion ON peticion.id_peticion = gestion_peticion.id_peticion
        `;
        const [totalPeticiones] = await db.query(countSql);
        const total = totalPeticiones[0].total;

        // Calcular el número total de páginas
        const totalPaginas = Math.ceil(total / porPagina);

        // Renderizar la vista con los datos de paginación
        res.render('historial_peticiones', {
            pagina: 'Historial de peticiones',
            titulo: 'Historial de peticiones',
            peticiones: peticiones,
            paginacion: {
                paginaActual: pagina,
                totalPaginas: totalPaginas,
                tieneAnterior: pagina > 1,
                tieneSiguiente: pagina < totalPaginas
            }
        });

    } catch (err) {
        res.render('error', {
            pagina: 'Error',
            titulo: '¡Algo fue mal!',
            mensaje: err
        });
    }
};

export { paginaPeticionesPendientes, verPeticion, administrarPeticion, paginaHistorialPeticiones }