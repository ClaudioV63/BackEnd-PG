// Importaciones
import { UsuariosController } from '../controllers/UsuariosController';
const { verificaToken, verificaAdminRole } = require('../middlewares/autentificacion');

// Definicion y exportacion de la clase.
export class RoutesUsuarios {

    // Nueva instancia de la clase UsuarioController ("controllers\UsuariosController")
    // Esta clase es la que interactua con la base de datos
    public usuariosController: UsuariosController = new UsuariosController();

    public routes(app: any): void {

        // Punto de entrada (endpoint)
        app.route('/usuarios').get(this.usuariosController.ObtenerUsuarios) //verificaAdminRole

        // Aqui estan los metodos del EndPoint, son los metodos disponibles de esta ruta.
        /*
            En este metodo GET, se ejecuta el middleware para validar si es administrador,
            luego se indica que ejecute el metodo ObtenerUsuarios de la clase usuariosController,
            que es la encargada de ir a buscar todos los usuarios a la base de datos, ya sea
            mediante un select o una llamada a una stored o funcion de postgre
         */

            // Metodo GET para obtener todos los usuarios
            

            // Si este metodo solo podria ser consumido por usuarios que sean Administadores
            // le pasaría el middleware 'verificaAdminRole' como parametro
            // en caso de ser varios middlewares los que se necesiten pasar, los mismos 
            // se pasan como arraglos [verificaAdminRole, otraVerificacion]   
            // Ejemplo:
            //.get(verificaAdminRole, this.usuariosController.ObtenerUsuarios) 
    
            // Metodo POST para insertar un nuevo usuario
            .post(this.usuariosController.NuevoUsuario) //verificaAdminRole
            // FIN del enpoint (/usuarios), en este ejemplo solo tiene dos metodos habilitados

        // Punto de entrada con parametro ID
        app.route('/usuario/:id')
            .get(this.usuariosController.ObtenerUsuarioID)
            .put(this.usuariosController.ActualizarUsuario)
            .delete(this.usuariosController.BorrarUsuario)


        app.route('/prueba').get(this.usuariosController.prueba)

    }
}