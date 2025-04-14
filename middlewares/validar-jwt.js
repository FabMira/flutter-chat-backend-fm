const jwt = require('jsonwebtoken');
const { tokenExtractor } = require('../helpers/tokenExtractor');


const validarJWT = ( req, res, next )=> {
    const token = tokenExtractor(req.headers);

    if ( token == null ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }
    
    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_KEY );

        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    
}

module.exports = {
    validarJWT
}