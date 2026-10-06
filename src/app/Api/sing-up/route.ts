// Install with: npm install bcryptjs @types/bcryptjs

import { sendverificationemail } from "@/helpers/sendverificationemail";
import dbconnect from "@/lib/dbconnect";

import UserModel from "@/model/user";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbconnect();

  try {
    const { username, email, password } = await req.json();

    const existinguserbyname = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existinguserbyname) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const existinguserbyemail = await UserModel.findOne({
      email,
    });

    // verify code here
    const verifyCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    if (existinguserbyemail) {
      if (existinguserbyemail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashpassword = await bcrypt.hash(password, 10);

        existinguserbyemail.password = hashpassword;
        existinguserbyemail.verifyCode = verifyCode;
        existinguserbyemail.verifyCodeExpire=new Date(Date.now()+3600000); // 1 hour from now

        await existinguserbyemail.save();
      }
    } else {
      const hashpassword = await bcrypt.hash(password, 10);

      const expiyedate = new Date();
      expiyedate.setHours(expiyedate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashpassword,
        verifyCode,
        verifyCodeExpire: expiyedate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
    }

    // send verification email

    const emailresponse = await sendverificationemail(
      email,
      username,
      verifyCode
    );

    if (!emailresponse.success) {
      return Response.json(
        {
          success: false,
          message: "Error sending verification email",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error registering user ", error);

    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}