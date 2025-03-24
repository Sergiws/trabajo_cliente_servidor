const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const INICIO_CURSO = 8;
const FIN_CURSO = 5;

const paginaCalendario = (req, res) => {
    const hoy = new Date();
    //Año actual, pero no quiero meterle una ñ
    const yActual = hoy.getFullYear();
    //Mes actual
    const mActual = hoy.getMonth();

    cargarCalendario(req, res, mActual, yActual);
}

const calendarioDiferente = (req, res) => {
    const { mes, year } = req.body;

    const mesNum = Number.parseInt(mes);
    const yearNum = Number.parseInt(year);

    cargarCalendario(req, res, mesNum, yearNum);
}

function crearCalendario(m, y){
    //getDay() devuelve el día de la semana. 0 = Domingo, 6 = Sábado
    const primerDia = new Date(y, m, 1).getDay();
    const ultimoDia = new Date(y, m+1, 0).getDate(); //Devuelve día del mes

    const hoy = new Date();

    const calendario = [];
    let semana = [];

    let contador = 0;
    let esFinde = false;
    let esPasado = false;

    //Meter días vacíos como ceros al principio
    const numDiasVacios = primerDia === 0 ? 6 : primerDia-1;
    for(let i=0 ; i<numDiasVacios ; i++){
        contador++;
        semana.push(0);
    }

    //Meter días del mes en el calendario
    for(let i=1 ; i<=ultimoDia ; i++){
        contador++;

        if(m == hoy.getMonth()){
            esPasado = i < hoy.getDate();
        }

        if(m < hoy.getMonth() || y < hoy.getFullYear()){
            esPasado = true;
        }

        if(y > hoy.getFullYear()){
            esPasado = false;
        }

        esFinde = contador%7 == 0 || contador%7 == 6;

        semana.push({
            dia: i,
            mes: m,
            year: y, //No quiero eñes
            estaBloqueado: esFinde || esPasado
        });

        if(semana.length == 7){
            calendario.push(semana);
            semana = [];
        }
    }

    //Meter días vacíos como ceros al final
    if(semana.length !== 0){
        while(semana.length < 7){
            semana.push(0);
        }
        calendario.push(semana);
    }

    return calendario;
}

function cargarCalendario(req, res, m, y){
    const calendario = crearCalendario(m, y);

    res.render('calendario', {
        pagina: 'Calendario',
        titulo: 'Calendario',
        mes: meses[m],
        calendario: calendario,
        mActual: m,
        yActual: y,
        anteriorBloqueado: m==INICIO_CURSO,
        siguienteBloqueado: m==FIN_CURSO
    });
}

export { paginaCalendario, calendarioDiferente }