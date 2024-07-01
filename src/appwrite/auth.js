import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
     client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name})
    {
        try{
          const userAccount=  await this.account.create(ID.unique(),email,password,name)
          if(userAccount){
           return this.login({email,password});
          }
          else{
            return userAccount;
          }
        }
        catch(error){
            throw error
        }
    }

    async login({email,password}){
        try{
           return await this.account.createEmailPasswordSession(   //alert: depricaated
                email, 
                password
            )
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            const user=await this.account.get();
            return user;
        }catch(err){
            console.log("Appwrite serive::getcurrentuser::error",err);
           //
        }
        return null;
    }

    async logout(){
        try{
          return await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite service:: logout :: error",error);
        }
    }
}
const authservice=new AuthService()
export default authservice