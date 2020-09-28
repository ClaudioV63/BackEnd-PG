// Importaciones de las rutas
import { RoutesUsuarios } from "./usuarios.route";

// Definicion y exportacion de clase Routes
export class Routes {
    public routes(app: any): void {

        // Asignacion de Rutas (API)
        app.route('/usuarios', new RoutesUsuarios().routes(app));
       
        app.route('/prueba', new RoutesUsuarios().routes(app));
    }
}