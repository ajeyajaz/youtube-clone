import bcrypt from 'bcrypt'
import User, {validateUser} from '../models/user.model.js'


export async function register(req, res){

    const {error, value} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //returns user instance or null
    let user = await User.findOne({email: value.email});
    if(user) return res.status(400).send("Invalid email or password.")

    user = new User({
        name: value.name,
        email: value.email,
        password: await bcrypt.hash(value.password, 10) // pasword hashing
    });
    await user.save();

    return res.status(201).json({name: user.name, email: user.email});
}



