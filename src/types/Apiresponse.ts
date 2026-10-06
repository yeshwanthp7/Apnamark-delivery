import { Message } from "@/model/user";

export interface Apiresponse{
  success: boolean;
  message: string;
  data?: any;
  isAcceptingMessages?: boolean
  messages?: Array<Message>
}

