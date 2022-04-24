import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (error) => {
    if (error) {
        console.log(`Error al conectarse a MongoDB 💀`);
    } else {
        console.log('Conectados a MongoDB!!! 🔥')
    }
});

export default mongoose;
