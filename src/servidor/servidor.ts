// Importaciones
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Routes } from "../routes/index.routes";

const SEED = require("../config/config");

export default class Server {

  public app: express.Application;
  public port: number;
  public rutas: Routes = new Routes();
   
  constructor( puerto: number ) {
    this.port = puerto;
    this.app = express();
    this.config();
    this.rutas.routes(this.app);  
    this.prepararStatic();
  }

  static init ( puerto: number) {
    return new Server( puerto );
  }

  start ( callback: Function ) {
    this.app.listen( this.port,  callback );
  }

  // Especifico la ruta que va a servir el contenido estatico (Imágenes, archivos varios, etc)
  private prepararStatic(): void {
    const publicPath = path.resolve(__dirname, 'public/');
    this.app.use(express.static(publicPath));
  }

  // Configuración del Servidor
  private config(): void{
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));     //para soportar application/x-www-form-urlencoded
    this.app.use(cookieParser('keysECretopAraC00kies'));
    this.app.use(session({
      secret: 'keysECretopAraC00kies',
      saveUninitialized: true,
      resave: true
    }))
    this.app.use(cors( {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Access-Control-Allow-Origin"],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: ["http://localhost:4200","https://www.nexserver.com.ar"], 
      preflightContinue: false
    })); 

    // NOTA de Opciones para CORS
    // El origen no puede ser '*' si se utilizan peticiones con "whithCredentials = true"
    // En este caso habrá que especificar Origin = protocol + hostname + port de donde se encuentra instalada la app Angular
    // ¿ciento no? o desde donde está navegando el cliente???!! > Sería una locura... yo que sé de donde...
    // VER DOC de Express.com CORS

  }

}

// export default new App().app;
