import {ID,Account,Client} from 'appwrite'
import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client()

const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'
const APPWRITE_PROJECT_ID = '65e89256a39c1809aa75'

class AppwriteService {
    account;
    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)
        this.account = new Account(appwriteClient)
    }
    //create a new record of user inside app write
    async createAcoount({email,password,name}) {
        try{
            const userAccount =await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount){
                return this.login({email,password})
            } else {
                return userAccount
            }
        }catch(e){
            Snackbar.show({
                text:String(e),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("App write service :: createAcoount() :: "+ e)
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            Snackbar.show({
                text:String(e),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("App write service :: login() :: "+ error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("App write service :: getCurrentUser() :: "+ error)
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("App write service :: logout() :: "+ error)
        }
    }
}

export default AppwriteService