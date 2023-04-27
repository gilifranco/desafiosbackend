const textChat = ( req, res) => {
    const avatar = req.user.photo;
    const saludo = `Bienvenido ${req.user.username}`;

    if (req.user?.username) {
        return res.render('UserLogin/mensajes', {saludo, avatar});
    }
    if (req.user?.admin) {
        return res.render('Admin/mensajes', {saludo, avatar});
    }
    res.redirect("/")
    
}

export { textChat };