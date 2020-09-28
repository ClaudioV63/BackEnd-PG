const { SEED } = require('../config/config');
import jwt from 'jsonwebtoken';

/* MIDDLEWARES
    Son funciones, que pueden ser llamadas antes de ejecutar un metodo, por ejemplo:
    se llama al metodo usuarios->obtenerUsuarios() pero solo puede ser accedido por 
    Administradores, entonces antes de ejecutar obtenerUsuarios() se llama a la 
    funcion verificaAdminRole(), esta funcion verifica que el usuario sea administrador, 
    si es verdadero continua, sino devuelve una respuesta personalizada y descarta la funcion
    obtenerUsuarios()

    Los middlewares son llamados desde las rutas donde estan los metodos.
*/

//======================================================
// Verifica Api-Key
//======================================================
let verificaKey = (req: any, res: any, next: any) => {
    let apikey = req.get('api-key'); // si viene en el header
    if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){ // si viene como parametro
        return res.status(401).json({
            err: true,
            error: 'Api-Key Invalida!'});
    } else {
        next();
    }                    
}

//======================================================
// Verifica Token
//======================================================
let verificaToken = (req: any, res: any, next: any) => {
    let token = req.get('token');
    
    jwt.verify(token, SEED , (err: any, decoded: any) => {
        console.log(`Req. desde: ${req.originalUrl}`);
        console.log(`Req. tipo:  ${req.method}`);       
        if(err){
            return res.status(401)
                .json({
                    ok: false,
                    error: {
                        token,
                        message: 'Token invalido',
                        err
                    }
                });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// ========================
// Verificar Roles
// ========================

let verificaAdminRole = (req: any, res: any, next: any) => {

    let usuario = req.usuario;
    if (usuario.role != 'ADMIN_ROLE') {
        return res.status(403).json({
            ok: false,
            err: {
                message: 'Debe ser Administrador'
            }
        });
    }
    next();
};

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaKey
}
