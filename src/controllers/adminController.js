const verificarAdmin = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect("/login");
    }
}

const paginaAdmin = (req, res) => {
    res.render('admin', {
        pagina: 'Admin',
        titulo: 'Administración de peticiones de reserva'
    });
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

export { verificarAdmin, paginaAdmin, logout }