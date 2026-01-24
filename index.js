import mongoose from "mongoose";


mongoose.connect('mongodb://localhost/youtube')
    .then(() => console.log('DB connected '))
    .catch(ex => console.log('could not connect to DB',ex));



