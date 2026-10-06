import mongoose , { Schema, Document } from 'mongoose';

 export interface Message extends Document {
    content : string
    createat: Date
}

const MessageSchema:Schema<Message> = new Schema({

    content:{
        type:String,
        required:true
    },
    createat:{
        type:Date,
        required:true,
        default:Date.now
    }
})


// this is user schema ....
 export interface User extends Document {
    username:string ;
    email:string ;
    password:string ;
    verifyCode:string ;
    verifyCodeExpire:Date ;
    isVerified:boolean ;
    isAcceptingMessages:boolean ;
    messages:Message[];
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        trim:true,
    },
    email:{
        type:String,
        
        required:[true,'email is required'],
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'email is not valid'],
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    verifyCode:{
        type:String,
        required:[true,'verify code is required']
    },
    isVerified:{
        type:Boolean,
        required:[true,'is verified is required']
    },
    verifyCodeExpire:{
        type:Date,
        required:true
    },
    isAcceptingMessages:{
        type:Boolean,
        required:true
    },
    messages:{
        type:[MessageSchema],
        default:[]
    }
})

 const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User',UserSchema);
 export default UserModel;