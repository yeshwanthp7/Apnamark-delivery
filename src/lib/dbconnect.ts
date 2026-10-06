import mongoose from "mongoose";


type connectionObject={
    isConnected?:number
}

const connection:connectionObject={}

async function dbconnect():Promise<void>{
    if(connection.isConnected){
        console.log('already connected')
        return
    }
    try{
        const db= await mongoose.connect(process.env.MONGO_URI as string)
        connection.isConnected=db.connections[0].readyState
        console.log('connected to database')
    } catch (error) {
        console.error('Error connecting to database:', error)
    }



}

export default dbconnect;