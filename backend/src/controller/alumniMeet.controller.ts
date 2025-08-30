import { Request, Response, NextFunction } from "express";
import {
  addNewAlumniService,
  createNewAlumniMeetService,
  deleteAlumniMeetService,
  deleteAlumniService,
  getAllAlumniListService,
  getAllAlumniMeetsService,
  updateAlumniMeetService,
  updateAlumniService,
} from "../services/alumniMeet.service";
import { alumniMeetDocument } from "../types/model.interface";
import {
  AlumniInput,
  AlumniMeetInput,
  customRequest,
} from "../types/interface";
import { removeBackground } from "../utility/aiBgRemover";
import { deleteFromCloudinary } from "../utility/cloudnaryDeletion";
import { getAlumniById } from "../dao/alumniMeet.dao";

export const getAllAlumni = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const alumniList = await getAllAlumniListService();
    res.status(200).json(alumniList);
  } catch (err) {
    next(err);
  }
};

export const addNewAlumni = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const file = req.file as Express.Multer.File & { path: string; filename: string };

    const parsedCareerTimeline = JSON.parse(data.careerTimeline);
    const parsedAchievements = JSON.parse(data.achievement);

    const alumniInput: AlumniInput = {
      ...data,
      careerTimeline: parsedCareerTimeline,
      achievements: parsedAchievements,
      profilePic: file?.path,
      fileName: file?.filename,
    };

    const newAlumni = await addNewAlumniService(alumniInput);

    return res.status(200).json({
      success: true,
      message: "Alumni added successfully",
      data: newAlumni,
    });
  } catch (err) {
    next(err);
  }
};


export const updateAlumni = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const imageFile = req.file as Express.Multer.File & {
      path: string;
      filename: string;
    };

    // const profilePicUrl = await removeBackground(
  //   (req as customRequest).fileName as string
  // );

    const data: AlumniInput = {
      ...req.body,
      achievements: req.body.achievement,
      ...(imageFile?.path && {
        profilePic: imageFile.path,
        fileName: imageFile.filename,
      }),
    };

    const updatedAlumni = await updateAlumniService(id, data);
    res.status(200).json(updatedAlumni);
  } catch (error) {
    next(error);
  }
};

export const deleteAlumni = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedAlumni = await deleteAlumniService(id);
    const fileName = deletedAlumni.fileName;
    await deleteFromCloudinary(fileName as string);

    res.status(200).json({
      success: true,
      message: "Alumni deleted successfully.",
      data: deletedAlumni,
    });
  } catch (err) {
    next(err);
  }
};

export const addNewAlumniMeet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const parsedClassJoined = JSON.parse(data.classJoined)
    console.log(parsedClassJoined)
    const parsedTime  = new Date(data.date)

    const Files = req.files as {
      images?: (Express.Multer.File & { path: string; filename: string })[];
      video?: (Express.Multer.File & { path: string; filename: string })[];
    };
    // const images: string[] = Files?.images?.map((file) => file.path) || [];
    // const imagesIds: string[] = Files?.images?.map((file) => file.filename) || [];

    const images =
  Files?.images?.map((file) => ({
    image: file.path,      
    imageId: file.filename, 
  })) || [];


    const video: string = Files?.video?.[0]?.path || "";
    const videoId: string = Files?.video?.[0]?.filename || "";

    const newData: AlumniMeetInput = {
      ...data,
      classJoined:parsedClassJoined,
      time:parsedTime,
      media: {
        images,
        videoLink: video,
        videoId: videoId,
      },
    };
    console.log(newData)

    const newAlumniMeet = await createNewAlumniMeetService(newData);

    res.status(200).json({
      success: true,
      message: "Alumni Meet added successfully",
      data: newAlumniMeet,
    });
  } catch (err: any) {
    console.error(err.message);
    next(err);
  }
};


export const getAllAlumniMeets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const alumniMeets: alumniMeetDocument[] = await getAllAlumniMeetsService();
  
    res
      .status(200)
      .json({ success: true, message: "All Alumni Meets", data: alumniMeets });
  } catch (err) {
    next(err);
  }
};

export const updateAlumniMeet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const videoFile = req.file as Express.Multer.File & {
      path: string;
      filename: string;
    };
    const imagesFiles = req.files as {
      images: (Express.Multer.File & { path: string; filename: string })[];
    };
    const videoUrl: string = videoFile?.path;
    const videoId: string = videoFile?.filename;
    console.log("1")
    const imagesUrl: string[] =
      imagesFiles?.images?.map((file) => file.path) || [];
      console.log("1")
    const imagesIds: string[] =
      imagesFiles?.images?.map((file) => file.filename) || [];

    const newData: AlumniMeetInput = {
      ...data,
      media: {
        ...(data.media || {}),
        ...(videoUrl && { videoLink: videoUrl, videoId }),
        ...(imagesUrl.length > 0 && { images: imagesUrl, imagesIds }),
      },
    };

    const deleteImagesUrls: string[] = req.body.deleteImages || [];
    const deleteImagesIds: string[] = req.body.deleteImagesIds || [];
    if (deleteImagesIds.length > 0) {
      await deleteFromCloudinary(deleteImagesIds as string[]);
    }
    const updatedAlumniMeet = await updateAlumniMeetService(
      id,
      newData,
      deleteImagesUrls
    );
    res.status(200).json({
      success: true,
      message: "Alumni Meet updated successfully",
      data: updatedAlumniMeet,
    });
  } catch (err:any) {
    console.log(err.message);
    next(err);
  }
};

export const deleteAlumniMeet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedAlumniMeet = await deleteAlumniMeetService(id);

    const imagesIds = deletedAlumniMeet?.media?.images.map((image)=>image.imageId);
    const videoId = deletedAlumniMeet?.media?.videoId;
    if (imagesIds) {
      await deleteFromCloudinary(imagesIds as string[]);
    }
    if(videoId){
      await deleteFromCloudinary([videoId as string]);
    }
    res.status(200).json({
      success: true,
      message: "Alumni Meet deleted successfully",
    });
  } catch (err:any) {
    console.log(err.message)
    next(err);
  }
};
