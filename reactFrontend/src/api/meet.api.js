import axiosInstance from "../utils/axiosInstance"

export const addMeetApi = async(formData)=>{
    return await axiosInstance.post("/addNewAlumniMeet" , formData)
}

export const getAllMeets = async()=>{
    return await axiosInstance.get("/allMeets")
}

export const deleteMeet = async(id)=>{
    return await axiosInstance.delete(`/meet/${id}`)
}

export const updateMeet = async(formData, meetId)=>{
    return await axiosInstance.put(`/meet/${meetId}` , formData)
}