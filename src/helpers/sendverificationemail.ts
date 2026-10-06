import { resend } from "@/lib/resend";

import { VerificationEmail } from "../../emails/Verificationemail"

import { Apiresponse } from "@/types/Apiresponse";

export async function sendverificationemail(
  email: string,
  username: string,
verifyCode:string
):Promise<Apiresponse> {
try{

    await resend.emails.send({
  from:"onboarding@resend.dev",
  to:email,
    subject:"Verification Email",
    react: VerificationEmail({ username, otp:verifyCode })
    })
    return {success:true,message:'Verification email sent successfully'};

}catch(emailError){
  console.error('Error sending verification email:', emailError);
  return {
    success: false,
    message: 'Failed to send verification email',
  };

}}