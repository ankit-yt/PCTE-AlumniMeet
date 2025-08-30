import React, { useState } from "react";
import Header from "./common/Header";
import FormCard from "./plan meet components/Form";
import loading from "../../public/loader.json";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import Search from "./common/Search";
import DeleteModel from "./common/DeleteModel";
import { deleteMeet, updateMeet } from "../api/meet.api";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

function PlanMeet() {
  const {reFetch , setReFetch} = useOutletContext()
  const allMeets = useSelector((state) => state.meet);
  const { meetLoading } = useSelector((state) => state.loading);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdding, setIsAdding] = useState(true);
  const [triggerReset, setTriggerReset] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [clickedMeet, setClickedMeet] = useState(-1);
  const [isAction, setIsAction] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  //form component states
  const [isSeaching, setIsSeaching] = useState(false);
  const [query, setQuery] = useState("");
  const [Step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [newClass, setNewClass] = useState("");
  const [classJoined, setClassJoined] = useState([]);
  const [organizedBy, setOrganizedBy] = useState("");
  const [location, setLocation] = useState("");
  const [alumniId, setAlumniId] = useState("");
  const [alumniName, setAlumniName] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [deletingMeetId, setDeletingMeetId] = useState('')
  const [meetId, setMeetId] = useState('')

  const [isImagesSelected, setIsImagesSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);

  //seach components states
  const [search, setSearch] = useState("");

  const handleDeleteMeet = async(id)=>{
    try{
      await deleteMeet(id)
      setReFetch(!reFetch)
      toast.success("Meet Deleted Successfully")
    }catch(e){
      toast.error(e.message)
    }
  }
  console.log("image url")
  console.log(previewURL)

  const handleUpdate = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
      formData.append("time", date);
      formData.append("classJoined", classJoined);
      formData.append("organizedBy", organizedBy);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("meetId", meetId);

     try{
       const response = await updateMeet(formData , meetId)
      console.log(response)
      setReFetch(!reFetch)
      toast.success("Meet Updated Successfully")
     }catch(e){
      toast.error(e.message)
     }
    
  }

  return (
    <div className="flex relative flex-col h-full w-full p-6 gap-6">
      {showDeleteConfirm && (
        <DeleteModel handler={{handleDelete:handleDeleteMeet}} values={{id: deletingMeetId}} setters={{setShowDeleteConfirm}}/>
      )}
      {meetLoading && (
        <div className="w-full bg-white/10 z-99 backdrop-blur-sm h-full absolute top-0 left-0 flex justify-center items-center">
          <Lottie
            animationData={loading}
            loop={true}
            autoplay={true}
            className="w-20 "
          />
        </div>
      )}
      <div className="md:px-10 h-full no-scrollbar overflow-auto ">
        <Header
          value={{
            isEditing,
            errorMessage,
            triggerReset,
            title1: "Schedule Meet",
            description1:
              "Provide the required details below to create and schedule a new alumni meet.",
            title2: "Update Meet Details",
            description2:
              "Modify the information below to update the scheduled alumni meet in the database.",
          }}
          setters={{ setErrorMessage, setIsAdding, setTriggerReset }}
        />
        <FormCard
          values={{
            isEditing,
            Step,
            title,
            date,
            classJoined,
            organizedBy,
            location,
            alumniId,
            alumniName,
            images,
            video,
            description,
            isSeaching,
            query,
            newClass,
            isImagesSelected,
            isVideoSelected,
            previewURL,
          }}
          setters={{
            setStep,
            setTitle,
            setDate,
            setClassJoined,
            setOrganizedBy,
            setLocation,
            setAlumniId,
            setAlumniName,
            setImages,
            setVideo,
            setDescription,
            setIsSeaching,
            setQuery,
            setNewClass,
            setIsImagesSelected,
            setIsVideoSelected,
            setPreviewURL,
            handleUpdate
          }}
          setTriggerReset={setTriggerReset}
          triggerReset={triggerReset}
        />
        {!isAdding && (
          <Search
            values={{
              isGalleryOpen,
              search,
              isAdding,
              list: allMeets,
              section: "planMeet",
              clickedItem: clickedMeet,
              isAction,
              showDeleteConfirm,
            }}
            setters={{
              setAlumniId,
              setTitle,
              setClassJoined,
              setOrganizedBy,
              setLocation,
              setDate,
              setAlumni:setAlumniId,
              setUpdatingMeetId:setMeetId,
              setDescription,
              setImages,
              setPreviewURL,
              setIsAdding,
              setIsGalleryOpen,
              setClickedItem: setClickedMeet,
              setIsAction,
              setIsEditing,
              setShowDeleteConfirm,
              setDeletingMeetId,
              setAlumniName,
              setMeetId
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PlanMeet;
