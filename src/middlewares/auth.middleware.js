import jwt from 'jsonwebtoken'


export default function(req, res, next){

    const authToken = req.get('x-auth-token');
    if(!authToken) return res.status(401).send('auth token is required.');

    jwt.verify(authToken, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err) return res.status(401).send('Invalid auth-token is required.');

        req.user = decoded;
        next();
    });
}