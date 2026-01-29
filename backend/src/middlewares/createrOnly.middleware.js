import {CREATOR_ROLE} from '../constanst.js'


export default async function (req, res, next){
    if(req.user.role !== CREATOR_ROLE){
        return res.status(403).send('no access permission.')
    }
    next();
};

