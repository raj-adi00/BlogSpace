import conf from "../conf/conf.js";
import { Client,ID,Databases,Storage,Query } from "appwrite";

class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }//alerrt
    async createPost({title,slug,content,featuredimage,status,userid})
    {
        // console.log(userId);
        try{
           return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimage,
                status,
                userid,
            }
           )
        }catch(error){
            console.log("Appwrite serive :: CreatePost :: error",error);
        }
    }

    async updatePost(slug,{title,content,featuredimage,status}){
      try{
         return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimage,
                status
            }
         );
      }catch(err){
        console.log("Appwrite serive :: UpdatePost :: error",err);
      }
    }

    async deletePost(slug){
        try{//alert
           return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
           );
        }catch(err){
            console.log("Appwrite serive :: deletePost :: error",err);
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(err){
            console.log("Appwrite serive :: getPost :: error",err);
            return false;
        }
    }
     
    async getPosts(queries=[Query.equal("status","active")]){
       try{
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )
       }catch(err){
        console.log("Appwrite serive :: getPosts :: error",err);
        return false;
       }
    }
    
    async  uploadFile(file){
     try{
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
     }catch(err){
        console.log("Appwrite serive :: uploadFile :: error",err);
        return false;
     }
    }

    async deleteFile(fileId){
        try{
         await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
         )
        }catch(err){
        console.log("Appwrite serive :: deleteFile :: error",err);
        return false;
       }
    }

     getFilereview(fileId){
        const link= this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
        // return ('https://cloud.appwrite.io/v1/storage/buckets/667499d500011ce339b6/files/66824b9700368d66adee/view?project=667486610029f4146453&mode=admin')
      return link
    }
    
}

const service=new Service()
export default service