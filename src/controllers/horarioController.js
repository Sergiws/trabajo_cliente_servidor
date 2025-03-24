import db from '../config/db.js';

const HORARIO_INICIO = 16;
const HORARIO_FIN = 23;
const NUM_AULAS = 6;

const paginaInicio = async (req, res) => {
    const hoy = new Date();
    const fecha = hoy.toLocaleDateString('es');

    try {
        const sql = `SELECT * FROM clase WHERE dia_semana=${hoy.getDay()}`;
        const [clasesBD] = await db.query(sql);

        const sql2 = `SELECT * FROM gestion_peticion INNER JOIN peticion
        ON gestion_peticion.id_peticion = peticion.id_peticion
        WHERE fecha='${hoy.getFullYear()}-${Number.parseInt(hoy.getMonth())+1}-${hoy.getDate()}' 
        AND estado='ACEPTADA'`;
        const [reservas] = await db.query(sql2);

        const ocupadas = clasesBD.concat(reservas);
        const disponibilidad = calcularDisponibilidad(ocupadas);
        const clases = calcularClases(ocupadas);

        res.render('horario', {
            pagina: 'Horario',
            titulo: `Horario de hoy`,
            clases,
            disponibilidad,
            fecha: hoy
        });

    } catch (err) {
        res.render('error', {
            pagina: 'Error',
            titulo: 'Error',
            mensaje: err
        });
    }
};

const paginaHorario = async (req, res) => {
    const hoy = new Date(req.query.year, req.query.mes, req.query.dia);
    const fecha = hoy.toLocaleDateString('es');

    try {
        const sql = `SELECT * FROM clase WHERE dia_semana=${hoy.getDay()}`;
        const [clasesBD] = await db.query(sql);

        const sql2 = `SELECT * FROM gestion_peticion INNER JOIN peticion
        ON gestion_peticion.id_peticion = peticion.id_peticion
        WHERE fecha='${req.query.year}-${Number.parseInt(req.query.mes)+1}-${req.query.dia}' 
        AND estado='ACEPTADA'`;
        const [reservas] = await db.query(sql2);

        const ocupadas = clasesBD.concat(reservas);
        const disponibilidad = calcularDisponibilidad(ocupadas);
        const clases = calcularClases(ocupadas);

        res.render('horario', {
            pagina: 'Horario',
            titulo: `Horario del día ${fecha}`,
            clases,
            disponibilidad,
            fecha: hoy
        });

    } catch (err) {
        res.render('error', {
            pagina: 'Error',
            titulo: 'Error',
            mensaje: err
        });
    }
};

function calcularDisponibilidad(ocupadas){
    const disponibilidad = [];
    let tabla = [];
    for(let aula=1 ; aula<=NUM_AULAS ; aula++){
        tabla = [];
        for(let hora=HORARIO_INICIO ; hora<HORARIO_FIN ; hora++){
            tabla.push(esHoraLibre(hora, aula, ocupadas));
        }
        disponibilidad.push(tabla);
    }
    return disponibilidad;
}

function calcularClases(ocupadas){
    const clases = [...ocupadas];
    let horas1, minutos1, horas2, minutos2;
    for(const clase of clases){
        [horas1, minutos1] = clase.hora_inicio.split(':').map(Number);
        [horas2, minutos2] = clase.hora_fin.split(':').map(Number);

        clase.top = (horas1*60 + minutos1 - HORARIO_INICIO*60) * 2;
        clase.height = (horas2*60 + minutos2 - horas1*60 - minutos1) * 2;
        clase.bottom = (HORARIO_FIN*60 - horas2*60 - minutos2) * 2;
    }
    return clases;
}

function esHoraLibre(hora, aula, clases) {
    for(const clase of clases){
        if(clase.aula == aula){
            if(clase.hora_inicio.startsWith(hora.toString())) return false;
            
            if(clase.hora_fin.startsWith(hora.toString()) && !clase.hora_fin.endsWith('00')) return false;
            

            let [horaInicio, x] = clase.hora_inicio.split(':').map(Number);
            let [horaFin, y] = clase.hora_fin.split(':').map(Number);

            if(hora > horaInicio && hora < horaFin) return false;
        }
    }

    return true;
}

export { paginaInicio, paginaHorario }