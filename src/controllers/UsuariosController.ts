// Importo el Request y Response de express
// lo importo para poder usarlo en el tipo en cada funcion
import { Request, Response } from 'express';
// underscore es una libreria usada para trabajar con objetos y arreglos
const _ = require('underscore');
// importo la constante que tiene la conexion a la base de datos
import { db } from '../helpers/postgre';
// importo de la configuracion lo que necesite
const LOGS = require("../config/config").LOGS;

// Exporto la clase que uso como controlador
export class UsuariosController {



    public prueba(req: Request, res: Response) {

        return res.status(200)
        .json({
            ok: true,
            err: false,
            mensaje: 'Peticion Correcta a Prueba',

        })
    }


    /*
        Todas las funciones de este controlador que son llamadas desde el EndPoint
        reciben como parametro un Request y un Response
        en el parametro req, tiene todo el objeto de la peticion (header, body, status, etc) y 
        en el parametro res, tiene la respuesta que va a ser enviada, es conveniente respetar
        una misma estructura de respuesta para facilitar la lectura desde el FRONTEND
    */

    // Obtener usuario por id
    public ObtenerUsuarioID(req: Request, res: Response){
        try{
            let id_usuario = req.params.id;                // <- id obtenido del parametro req
            db.func('sp_obtener_usuario', [id_usuario])  // <- funcion de la base, devuelve una promesa
                .then(data => {                            // <- si la promesa esta ok
                    if(LOGS == 'SI') console.log(data);    // <- si esta habilitado el log lo muestro
                    return res.status(200)                 // <- devuelvo un estado 200
                        .json({                            // <- la respuesta es un json
                            err: false,                    // <- no hay error
                            mensaje: 'Peticion Correcta',  // <- mensaje que devuelvo
                            insertado: data                // <- datos que devuelvo
                        })                                 // <- fin de la respuesta
                })                                         // <- fin de la promesa
                .catch(err => {                            // <- hubo error en la promesa
                    if(LOGS == 'SI') console.log(err);     // <- si esta hab el log lo muestro
                    return res.status(500)                 // <- devuelvo un estado 500
                    .json({                                // <- la respuesta es un json
                        err: true,                         // <- hubo un error
                        mensaje: 'Error en la Peticion',   // <- mensaje que devuelvo 
                        error: err                         // <- datos del error que devuelvo
                    })                                     // <- fin de la respuesta
                })                                         // <- fin de la funcion de la base de datos   
        }                                                  // <- fin del try  
        catch(err){                                        // <- si hubo un error en el try
            if(LOGS == 'SI') console.log(err);             // <- lo muestro en consola si esta habilitado
            return res.status(500)                         // <- devuelvo un estado 500
            .json({                                        // <- la respuesta es un json
                err: true,                                 // <- hubo un error
                mensaje: 'Error en la Peticion',           // <- mensaje que devuelvo 
                error: err                                 // <- datos del error que devuelvo
            })                                             // <- fin de la respuesta          
        }                                                  // <- fin del catch
    }                                                      // <- FIN de la Funcion

    // Obtener todos los usuarios
    public ObtenerUsuarios(req: Request, res: Response){
        try{ // <- para control de errores
            // Llamo a la funcion de la base de datos
            db.func("sp_obtener_usuarios") 
                // devuelve una promesa
                .then(data => {
                    if(LOGS == 'SI') console.log(data);
                    // Verifica si me devolvio algun usuario
                    if(!data){
                        // si no hay usuarios, devuelvo un estado 404 y un mensaje
                        return res.status(404)
                        .json({
                            err: false,
                            mensaje: 'No existen usuarios',
                            usuarios: null
                        })   
                    }
                    // data existe, asique tengo usuarios...
                    // devuelvo un estado 200 y en la respuesta un arreglo de objetos 
                    // con todos los usuarios
                    return res.status(200)
                        .json({
                            err: false,
                            mensaje: 'Peticion Correcta',
                            usuarios: data
                        })
                })
                // hubo un error en la promesa
                .catch(err => {
                    if(LOGS == 'SI') console.log(err);
                    // devuelvo un estado 500 y un mensaje, junto con el error
                    return res.status(500)
                        .json({
                            err: true,
                            mensaje: 'Error en la Peticion',
                            error: err
                        })
                })
                
        }
        // hubo un error en el try
        catch(err){
            if(LOGS == 'SI') console.log(err);
            // devuelvo un estado 500 y un mensaje, junto con el error
            return res.status(500)
            .json({
                err: true,
                mensaje: 'Error en la Peticion',
                error: err
            })
        }
    }

    // Insertar Nuevo Usuario
    // En este caso, como recibo los datos los envio a la funcion de postgre para la insercion
    // en otro ejemplo, voy a poner una validacion, para que existan los datos a enviar
    // y que tengan el formato correcto, para esto se usan los modelos.
    // Tendria un modela llamado usuarioModel por ejemplo:
    /*
        export public class usuarioModel {
            nombre: string,
            role: string,
            id?: number    <- en este caso seria opcional al tener signo ?
        }
        
        y en el metodo NuevoUsuario, crearia una instancia del modelo con los datos:
        let Usuario = new usuarioModel();
        this.usuario.nombre = body.nombre;             <- cargo en el modelo el nombre
        this.usuario.role = body.role;                 <- cargo en el modelo el role
            
            * si tengo algun parametro que tengo que convertir en numero, aca es donde, ya que
            * el modelo no me va a permitir poner un string.
            
        db.func('sp_insertar_usuario('+Usuario+')')    <- llamo a la func. y le paso todo el modelo
    */

    public NuevoUsuario(req: Request, res: Response){
        try{
            let body = req.body;
            let nombre = body.nombre;
            if(LOGS == 'SI') console.log(nombre);
            db.func('sp_insertar_usuario', [nombre])
            .then(data => {
                if(LOGS == 'SI') console.log(data);
                return res.status(200)
                        .json({
                            err: false,
                            mensaje: 'Peticion Correcta',
                            insertado: data
                        })
            })
            .catch(err => {
                if(LOGS == 'SI') console.log(err);
                return res.status(500)
                .json({
                    err: true,
                    mensaje: 'Error en la Peticion',
                    error: err
                })
            });
        }
        catch(err){
            if(LOGS == 'SI') console.log(err);
            return res.status(500)
            .json({
                err: true,
                mensaje: 'Error en la Peticion',
                error: err
            })
        }
    }

    
    // Actualizar Usuario
    public ActualizarUsuario(req: Request, res: Response){
        try{
            let id_usuario = req.params.id; // id obtenido del parametro req
            let body = req.body;
            // creo un objeto para pasarle a la funcion (Reemplaza al modelo)
            let nombre = body.nombre;
            db.func('sp_actualizar_usuario', [id_usuario, nombre])
                .then(data => {
                    if(LOGS == 'SI') console.log(data);
                    return res.status(200)
                        .json({
                            err: false,
                            mensaje: 'Peticion Correcta',
                            actualizado: data
                        })
                })
                .catch(err => {
                    if(LOGS == 'SI') console.log(err);
                    return res.status(400)
                    .json({
                        err: true,
                        mensaje: 'Error en la Peticion',
                        error: err
                    })
                })
        }
        catch(err){
            if(LOGS == 'SI') console.log(err);
            return res.status(500)
            .json({
                err: true,
                mensaje: 'Error en la Peticion',
                error: err
            })
        }
    }

    // Borrar Usuario
    public BorrarUsuario(req: Request, res: Response){
        try{
            let id_usuario = req.params.id; // id obtenido del parametro req
            db.func('sp_borrar_usuario', [id_usuario])
                .then(data => {
                    if(LOGS == 'SI') console.log(data);
                    return res.status(200)
                        .json({
                            err: false,
                            mensaje: 'Peticion Correcta',
                            eliminado: 'Usuario con '+id_usuario+' eliminado correctamente'
                        })
                })
                .catch(err => {
                    if(LOGS == 'SI') console.log(err);
                    return res.status(500)
                    .json({
                        err: true,
                        mensaje: 'Error en la Peticion',
                        error: err
                    })
                })
        }
        catch(err){
            if(LOGS == 'SI') console.log(err);
            return res.status(500)
            .json({
                err: true,
                mensaje: 'Error en la Peticion',
                error: err
            })
        }
    }


}