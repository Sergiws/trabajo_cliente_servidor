import db from "../config/db.js";

const paginaLogin = (req, res) => {
    const errores = [];

    res.render('login', {
        pagina: 'Login',
        titulo: 'Acceso para Administradores',
        errores: errores
    })
}

const acceder = async (req, res) => {
    const { correo, password } = req.body;
    const errores = [];

    const recargarPagina = () => {
        res.render('login', {
            pagina: 'Login',
            titulo: 'Acceso para Administradores',
            correo: correo.trim(),
            errores: errores
        })
    }

    if (correo.trim() === '') {
        errores.push({ mensaje: "El correo está vacío" });
    }
    if (password.trim() === '') {
        errores.push({ mensaje: "La contraseña está vacía" });
    }

    try{
        const sql = `SELECT * FROM ADMIN WHERE CORREO='${correo}' AND PASSWORD='${password}'`;
        const [admin, metadata] = await db.query(sql);

        if(admin.length > 0){
            req.session.admin = correo;
            res.redirect('/admin');
        } else{
            errores.push({mensaje: 'Correo y/o contraseña incorrectos'});
            recargarPagina();
        }

    } catch(err){
        errores.push({mensaje: `Error con la base de datos: ${err}`});
        recargarPagina();
    }
    
}

export { paginaLogin, acceder }