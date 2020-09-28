
import {IMain, IDatabase} from 'pg-promise';
import pgPromise from 'pg-promise';

const pgp:IMain = pgPromise({
    // Opciones de Inicializacion
});

// String de conecion a la base de datos
// const cn:string = 'postgres://postgres:1234@localhost:3333/prueba';    // 'postgres://postgres:1234@localhost:5432/prueba';

// Alternativa...

const cn = {
    host: 'localhost', // server name or IP address;
    port: 1111,
    database: 'myDatabase',
    user: 'myUser',
    password: 'myPassword'
};

// Exportacion de la constante de la conexion
export const db:IDatabase<any> = pgp(cn);

