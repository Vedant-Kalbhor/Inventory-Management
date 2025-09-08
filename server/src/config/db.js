const mongoose=require('mongoose');

async function connectDB(uri){
    if(!uri){
        throw new Error('MONGO_URI is not defined in env');
    }
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri,{

    });
    console.log('MongoDB connected');   
}
module.exports={connectDB};