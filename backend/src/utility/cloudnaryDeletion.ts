import cloudinary from "../config/cloudnary";

export const deleteFromCloudinary = async(media:string | string[])=>{
    try{
        const mediaArray = Array.isArray(media)? media : [media];
    const deletedPromises = mediaArray.map(filename=>{
        const publicId = filename;
        return cloudinary.uploader.destroy(publicId);
    })
    await Promise.all(deletedPromises);
    console.log("Media deleted from cloudinary successfully");
    }catch(err){
         console.error(" Error deleting media from Cloudinary:", (err as Error).message);
        throw new Error("Failed to delete one or more media files from Cloudinary.");
    }
}