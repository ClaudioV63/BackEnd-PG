const { PORT } = require("./config/config");
import Server from './servidor/servidor';

const server = Server.init( PORT );

server.start( () => {
  console.log(`Servidor corriendo MUCHO en puerto ${PORT}`);
} )

// Inicialización del servidor 
// Si no existe ningun puerto por defecto va al 3010 configurado en config.ts 
/*
app.listen(PORT, (err: any) => {
  if (err) {
      return console.log(err);
  }

  return console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;
*/