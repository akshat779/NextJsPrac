import config from "@/config/config";
import { Client,Account,ID } from "appwrite";

type CreateUserAccount = {
    email:string,
    password:string,
    name:string
}

type LoginUserAccount = {
    email:string,
    password:string
}

const appwriteClient = new Client()
appwriteClient.setEndpoint(config.appwriteEndpoint).setProject(config.appwriteProjectId)
console.log("appwriteClient endpoint",config.appwriteEndpoint)
console.log("appwriteClient project",config.appwriteProjectId)

export const account = new Account(appwriteClient)


export class AppwriteService{
    async createUserAccount({email,password,name}:CreateUserAccount){
        try{
            const userAccount = await account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.loginUser({email,password})
            }
            else{
                return userAccount
            }
        }
        catch(error){
            throw error
        }
    }

    async loginUser({email,password}:LoginUserAccount){
        try{
            const userAccount = await account.createSession(email,password)
            return userAccount
        }
        catch(error){
            throw error
        }
    }

    async isLoggedIn():Promise<boolean>{
        try {
            const data = await this.getCurrentUser();
            return data !== undefined; // Check if data is not undefined
        } catch (error) {
            throw error;
        }
        return false
    }

    async getCurrentUser(){
        try{
            const user = await account.get()
            return user
        }
        catch(error){
            console.log("getCurrentUser error",error)
            throw error
        }

        return null
    }

    async logout(){
        try{
            return await account.deleteSession("current")
        }
        catch(error){
            throw error
        }
    }
}

const appwriteService = new AppwriteService()
export default appwriteService