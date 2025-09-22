import axiosInstance from "../utils/axiosInstance"

export const randomFeedbacks = async()=>{
    return await axiosInstance.get("/feedback")
}

export const addFeedback = async(data)=>{
    return await axiosInstance.post("/feedback",data)
}