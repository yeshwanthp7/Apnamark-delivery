import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import bcrypt from "bcryptjs";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/user";





export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"credentials",
            credentials:{
        username: { label: "Username", type: "email", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }

            },
            async authorize(credentials, any):Promise<any>{
             await dbconnect();
             try {
                  if (!credentials?.username || !credentials?.password) {
                        return null;
                    }

                const user = await UserModel.findOne({
                    $or:[
                        { email: credentials.username },
                            { username: credentials.username },
                    ],
                })
                if(!user){
                    throw new Error("User not found")

                }
                if(!user.isVerified){
                    throw new Error("User is not verified")
                }
                const isMatch = await bcrypt.compare(credentials.password, user.password)   
             } catch (error: any) {
                throw new Error(error.message)
             }
            } 

        })
    ]
}