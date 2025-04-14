
const tokenExtractor = ( headers ) => {
    const authorization = headers['authorization'];
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    } else {
        return null;
    }
}

module.exports = {
    tokenExtractor
}