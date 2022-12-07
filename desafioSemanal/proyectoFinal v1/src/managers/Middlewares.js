const admin = true;

const isAdmin = (req,res,next) => {
    if (!admin){
        return res.status(403).json({error: 403, description: `Esta no es la ruta ${req.method} prueba con esta ${req.originalUrl}`});
    } else {
        return next();
    }
}

const errorHandler = (error, req, res, next) => {
    console.log(error);
    return res.status(400).json({"error": 400, "description": error.message});
}

const notFound = (req, res, next) =>{
    return res.status(400).json({error: 404, description: `No implemente este metodo`})
}

module.exports = { isAdmin, errorHandler, notFound };