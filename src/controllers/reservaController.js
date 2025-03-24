import db from '../config/db.js';
import PDFDocument from 'pdfkit';

const paginaReserva = (req, res) => {
    res.render('error', {
        pagina: 'Error',
        titulo: 'Error',
        mensaje: 'Seleccione una hora en un horario para poder gestionar su reserva'
    });
}

const gestionarPeticion = async (req, res) => {
    const accion = req.body.accion;
    const datos = {};

    switch (accion) {

        case 'mostrar':
            datos.aula = req.body.aula;
            datos.hora_inicio = req.body.hora_inicio;
            datos.hora_fin = req.body.hora_fin;

            const [year, month, day] = req.body.fecha.split('-');
            datos.fecha = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

            // res.send(datos.fecha);

            res.render('reserva', {
                pagina: 'Reserva',
                titulo: 'Petición de reserva',
                datos: datos
            });
            break;

        case 'enviar':
            datos.aula = req.body.aula;
            datos.hora_inicio = req.body.hora_inicio;
            datos.hora_fin = req.body.hora_fin;
            datos.fecha = req.body.fecha.split('T')[0];
            datos.correo = req.body.correo;

            try {
                const sql = `INSERT INTO peticion (contacto, id_aula, fecha, hora_inicio, hora_fin) VALUES ('${datos.correo}', ${datos.aula}, '${datos.fecha}', '${datos.hora_inicio}', '${datos.hora_fin}')`;
                const [resultados, metadata] = await db.query(sql);

                res.render('reserva', {
                    pagina: 'Reserva',
                    titulo: 'Petición de reserva',
                    datos: datos,
                    confirmacion: true
                });

            } catch (err) {
                res.render('error', {
                    pagina: 'Error',
                    titulo: 'Error',
                    mensaje: err
                });
            }
            break;

        case 'descargar':
            datos.aula = req.body.aula;
            datos.hora_inicio = req.body.hora_inicio;
            datos.hora_fin = req.body.hora_fin;
            datos.fecha = req.body.fecha.split('T')[0];
            datos.correo = req.body.correo;

            try {
                // Crear un nuevo documento PDF
                const doc = new PDFDocument();

                // Configurar la respuesta para descargar el PDF
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=reserva.pdf');

                // Pipe el PDF a la respuesta
                doc.pipe(res);

                // Agregar contenido al PDF
                doc.fontSize(18).text('Confirmación de Reserva', { align: 'center' }).moveDown();

                // Crear una tabla con los datos
                const table = {
                    headers: ['Campo', 'Valor'],
                    rows: [
                        ['Aula', datos.aula],
                        ['Hora de inicio', datos.hora_inicio],
                        ['Hora de fin', datos.hora_fin],
                        ['Fecha', datos.fecha],
                        ['Correo electrónico', datos.correo],
                    ],
                };

                // Dibujar la tabla
                const startX = 50;
                const startY = 100;
                const cellPadding = 10;
                const columnWidth = 250;
                const rowHeight = 30;

                // Encabezados
                doc.font('Helvetica-Bold').fontSize(12);
                doc.text(table.headers[0], startX, startY, { width: columnWidth, align: 'left' });
                doc.text(table.headers[1], startX + columnWidth, startY, { width: columnWidth, align: 'left' });

                // Filas
                doc.font('Helvetica').fontSize(12);
                table.rows.forEach((row, i) => {
                    const y = startY + (i + 1) * rowHeight;
                    doc.text(row[0], startX, y, { width: columnWidth, align: 'left' });
                    doc.text(row[1], startX + columnWidth, y, { width: columnWidth, align: 'left' });
                });

                // Bordes de la tabla
                doc.rect(startX, startY, columnWidth * 2, rowHeight * (table.rows.length + 1)).stroke();

                // Finalizar el PDF y cerrar la respuesta
                doc.end();
            } catch (error) {
                console.error('Error al generar el PDF:', error);
                res.status(500).send('Error al generar el PDF');
            }
            break;

        default:
            res.render('error', {
                pagina: 'Error',
                titulo: 'Error',
                mensaje: 'Página no encontrada'
            });
    }
}

export { paginaReserva, gestionarPeticion }