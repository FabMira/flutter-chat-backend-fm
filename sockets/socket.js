const { io } = require('../index');
const { tokenExtractor } = require('../helpers/tokenExtractor');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesonectado, grabarMensaje } = require('../controllers/socket');


//  Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    // Extraer el token del header
    const token = tokenExtractor(client.handshake.headers);
    //  comprobara si el token es válido
    const [ valido, uid ] = comprobarJWT(token);

    if ( !valido ) {return client.disconnect();} 
    usuarioConectado(uid);
    // ingresar al usuario a una sala en particular
    // sala global
    client.join(uid);

    // escuchar del cliente el mensaje-personal

    client.on('mensaje-personal', async (payload) => {
        //  TODO: grabar mensaje
        await grabarMensaje(payload);
        // Emitir el mensaje a la sala de destino
        io.to(payload.para).emit('mensaje-personal', payload);
    });


    client.on('disconnect', () => {
        usuarioDesonectado(uid);
        
    })
    
})