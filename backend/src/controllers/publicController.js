import Post from "../models/postModel.js"

export const GetAllPost = async(req ,res ,next) => {
    try {
        
        const data = await Post.find({}).populate("user").sort({createdAt:-1});
        console.log("data: " ,data);
        
        res.status(200).json({message:"Post Fetched", data:data})

    } catch (error) {
        next(error)
        
    }
}