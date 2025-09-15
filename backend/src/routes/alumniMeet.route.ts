import express, {Response , Request}  from "express";
import {  addNewAlumni, addNewAlumniMeet, deleteAlumni, deleteAlumniMeet, deleteMeetMedia, getAllAlumni, getAllAlumniMeets, updateAlumni, updateAlumniMeet, updateMeetMedia } from "../controller/alumniMeet.controller";
import { alumniMeetUpload, profilePicUpload, profilePicWithBgUpload, } from "../middleware/multer";


const router = express.Router();

router.get("/" ,getAllAlumni)
router.get("/allMeets" , getAllAlumniMeets)
router.post("/addNewAlumni", profilePicWithBgUpload.single("profilePic")  , addNewAlumni)
router.delete("/deleteAlumni/:id", deleteAlumni);
router.post("/addNewAlumniMeet", alumniMeetUpload, addNewAlumniMeet );
router.put("/updateAlumni/:id" ,profilePicWithBgUpload.single("profilePic")  , updateAlumni)
router.delete("/meet/:id" , deleteAlumniMeet)
router.put("/meet/:id", alumniMeetUpload, updateAlumniMeet);
router.put("/meet/:id/mediaUpload" , alumniMeetUpload , updateMeetMedia)
router.delete("/meet/:id/mediaUpload" , deleteMeetMedia)




export default router;