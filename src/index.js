import express from 'express';
import session from 'express-session';
import router from './routers/routers.js';
import db from './config/db.js';

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(
    session({
        secret: process.env.SESSION_SECRET, //Para firmar la cookie de sesión
        resave: false, //No se vuelve a guardar la sesión si no hay cambios
        saveUninitialized: false, //No guardar sesiones vacías
        cookie: {secure: false} //false porque utilizamos HTTP (true con HTTPS)
    })
);

db.authenticate()
.then(() => { console.log('Conectado a la base de datos') })
.catch((err) => { console.log(err) });

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.set('views', './src/views');

app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    res.locals.nombrePagina = 'New Art';
    res.locals.session = req.session;
    next();
});

app.use(express.static('./src/public'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});