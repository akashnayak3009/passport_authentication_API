import mongoose from 'mongoose'
import colors from 'colors';


const connectDB =async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true ,
             useUnifiedTopology :true,
        });
        console.log(`MongoDB connected  ${conn.connection.host}`.magenta.bold.italic.underline);
    }catch(error){
        console.log(`ERROR: ${error.message}.red.bold`);
        process.exit();
    }
};

export default connectDB;