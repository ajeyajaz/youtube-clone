import jwt from 'jsonwebtoken'


export default function(req, res, next){

    const authToken = req.headers.authorization?.split(' ')[1];
    if(!authToken) return res.status(401).send('auth token is required.');

    jwt.verify(authToken, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err) return res.status(401).send('Invalid auth-token.');

        req.user = decoded;
        next();
    });
}