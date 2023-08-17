import mongoose from 'mongoose';


let isConnected = false;

console.log(isConnected);

console.log(process.env.MONGODB_URL)

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
    if (isConnected) return console.log('Mongoose is not connected')
    
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error)
    }
}