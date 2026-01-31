import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export async function refresh(req, res){

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(400).send('refresh token required.');

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

        const user = await User.findById(payload._id);
        if(!user) return res.status(404).send('user not found.');
        
        const newAccessToken = user.getAccessToken();
        return res.json({token: newAccessToken});

    } catch (ex) {
        return res.status(400).send('invalid refresh token.');
    }
}