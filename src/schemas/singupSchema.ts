import {z} from "zod";

export const usernamevalidation=z
      .string()
      .min(3,{message:'username must be at least 3 characters long'})
      .max(20,{message:'username must be at most 20 characters long'})
      .regex(/^[a-zA-Z0-9_]+$/,{message:'username can only contain letters, numbers and underscores'});

export const singupSchema=z.object({
    usernamme:usernamevalidation,
    email:z.string().email({message:'email is not valid'}),
    password:z.string().min(6,{message:'password must be at least 6 characters long'})
})      