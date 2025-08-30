import {
  addNewAlumniDao,
  checkAlumniByIdDao,
  checkAlumniMeetsDao,
  createNewAlumniMeetDao,
  deleteAlumniDao,
  deleteAlumniMeetDao,
  findAlumniByIdDao,
  getAllAlumniDao,
  getAllAlumniMeetsDao,
  updateAlumniDao,
  updateAlumniMeetDao,
} from "../dao/alumniMeet.dao";
import alumniModel from "../model/alumni.model";
import { AlumniInput, AlumniMeetInput } from "../types/interface";
import { Alumni, alumniMeetDocument } from "../types/model.interface";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../utility/customErrors";
import { deleteFromCloudinary } from "../utility/cloudnaryDeletion";
import mongoose from "mongoose";

export const getAllAlumniListService = async (): Promise<Alumni[]> => {
  const alumniList = await getAllAlumniDao();

  return alumniList;
};

export const addNewAlumniService = async (
  data: AlumniInput
): Promise<Alumni> => {
  const requiredFields: { [key: string]: string } = {
    name: "Please enter your full name",
    batch: "Please enter your batch",
    email: "Please enter your email address",
    currentCompany: "Please enter your current company",
    currentRole: "Please enter your current role",
    achievement: "Please enter at least one achievement",
  };

  for (const field of Object.keys(requiredFields)) {
    if (!data[field as keyof AlumniInput]) {
      throw new ValidationError(requiredFields[field]);
    }
  }

  if (!data.profilePic)
    throw new ValidationError("Please upload a profile picture");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email))
    throw new ValidationError("Please enter a valid email address");

  if (
    data.linkedIn &&
    !/^https:\/\/(www\.)?linkedin\.com\/.*$/.test(data.linkedIn)
  )
    throw new ValidationError("Please enter a valid LinkedIn profile link");

  if (!Array.isArray(data.careerTimeline) || data.careerTimeline.length === 0)
    throw new ValidationError("Please add at least one career timeline entry");

  for (const step of data.careerTimeline) {
    if (!step.year || !step.role || !step.company || !step.location)
      throw new ValidationError(
        "Each career step must include year, role, company, and location"
      );
  }

  const isEmailExist = await alumniModel.findOne({ email: data.email });
  if (isEmailExist)
    throw new ConflictError(
      "This email is already registered. Try another one."
    );

  try {
    return await addNewAlumniDao(data);
  } catch (err) {
    if (data.fileName) await deleteFromCloudinary(data.fileName as string);
    throw err;
  }
};

export const createNewAlumniMeetService = async (
  data: AlumniMeetInput
): Promise<alumniMeetDocument> => {
  try {
    
    if (
      !data.title ||
      typeof data.title !== "string" ||
      data.title.trim().length < 3
    ) {
      throw new ValidationError("Title must be at least 3 characters long");
    }

    if (!data.organizedBy || data.organizedBy.trim().length < 2) {
      throw new ValidationError("Organized By is required");
    }

    if (!data.location || data.location.trim().length < 2) {
      throw new ValidationError("Location is required");
    }

    if (data.description && data.description.length > 1000) {
      throw new ValidationError("Description cannot exceed 1000 characters");
    }

    if (!data.time || isNaN(new Date(data.time).getTime())) {
      throw new ValidationError("A valid date is required");
    }

    if (!data.alumni || !mongoose.Types.ObjectId.isValid(data.alumni)) {
      throw new ValidationError("Please select a valid Alumni");
    }

    
    if (
      data.classJoined && data.classJoined.some(
        (cls:string) => !cls || typeof cls !== "string" || cls.trim().length < 2
      )
    ) {
      throw new ValidationError("Invalid class values provided");
    }

    
    if (data.media.images.length > 5) {
      throw new ValidationError("You can upload a maximum of 5 images");
    }
    if (data.media.videoLink && typeof data.media.videoLink !== "string") {
      throw new ValidationError("Invalid video link provided");
    }

    data.title = data.title.trim();
    data.organizedBy = data.organizedBy.trim();
    data.location = data.location.trim();
    data.description = data.description?.trim();

    const newAlumniMeet = await createNewAlumniMeetDao(data);
    return newAlumniMeet;
  } catch (e) {
    await Promise.all(
      data.media.images.map(async (image) => {
        await deleteFromCloudinary(image.imageId);
      })
    );
    if (data.media.videoId) {
      await deleteFromCloudinary(data.media.videoId);
    }
    throw e;
  }
};

export const deleteAlumniService = async (id: string): Promise<Alumni> => {
  const isAlumniExist = await checkAlumniByIdDao(id);
  if (!isAlumniExist) {
    throw new NotFoundError("Can't delete alumni. Alumni not exist");
  }
  const isMeetsExist = await checkAlumniMeetsDao(id);
  if (isMeetsExist) {
    throw new BadRequestError(
      "Cannot delete alumni. Alumni is associated with a meet."
    );
  }
  const deletedAlumni = await deleteAlumniDao(id);
  if (!deletedAlumni)
    throw new NotFoundError(
      "Deletion failed. Alumni may have already been deleted."
    );

  return deletedAlumni;
};

export const updateAlumniService = async (
  id: string,
  data: AlumniInput
): Promise<Alumni> => {
  const requiredFields: { [key: string]: string } = {
    name: "Please enter your full name",
    batch: "Please enter your batch",
    email: "Please enter your email address",
    currentCompany: "Please enter your current company",
    currentRole: "Please enter your current role",
    achievement: "Please enter at least one achievement",
  };

  for (const field of Object.keys(requiredFields)) {
    if (!data[field as keyof AlumniInput]) {
      throw new ValidationError(requiredFields[field]);
    }
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new NotFoundError("Invalid alumni ID");

  //  Parse JSON safely
  let parsedCareerTimeline, parsedAchievements;
  try {
    parsedCareerTimeline = JSON.parse(data.careerTimeline as unknown as string);
    parsedAchievements = JSON.parse(data.achievements as unknown as string);
  } catch {
    throw new ValidationError(
      "Invalid JSON format for career timeline or achievements"
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email))
    throw new ValidationError("Please enter a valid email address");

  if (
    data.linkedIn &&
    !/^https:\/\/(www\.)?linkedin\.com\/.*$/.test(data.linkedIn)
  )
    throw new ValidationError("Please enter a valid LinkedIn profile link");

  if (!Array.isArray(parsedCareerTimeline) || parsedCareerTimeline.length === 0)
    throw new ValidationError("Please add at least one career timeline entry");

  for (const step of parsedCareerTimeline) {
    if (!step.year || !step.role || !step.company || !step.location)
      throw new ValidationError(
        "Each career step must include year, role, company, and location"
      );
  }

  const isAlumniExist = await checkAlumniByIdDao(id);
  if (!isAlumniExist)
    throw new NotFoundError("Cannot update alumni. Alumni not exist");

  const oldAlumni = await findAlumniByIdDao(id);
  if (!oldAlumni)
    throw new NotFoundError("Cannot update alumni. Alumni not exist");

  // Delete old profile picture if new one uploaded
  if (data.profilePic && oldAlumni.fileName) {
    await deleteFromCloudinary(oldAlumni.fileName as string);
  }

  try {
    return (await updateAlumniDao(id, {
      ...data,
      careerTimeline: parsedCareerTimeline,
      achievements: parsedAchievements,
    })) as Alumni;
  } catch (err) {
    throw err;
  }
};

export const getAllAlumniMeetsService = async (): Promise<
  alumniMeetDocument[]
> => {
  const alumniMeets = await getAllAlumniMeetsDao();
  return alumniMeets;
};

export const updateAlumniMeetService = async (
  id: string,
  data: AlumniMeetInput,
  deleteImages: string[]
): Promise<alumniMeetDocument> => {
  const isAlumniMeetExist = await checkAlumniMeetsDao(id);
  if (!isAlumniMeetExist) {
    throw new Error("Cannot update alumni meet. Alumni meet not exist");
  }
  const updatedAlumniMeet = await updateAlumniMeetDao(id, data, deleteImages);
  if (!updatedAlumniMeet) throw new Error("Updation failed !.");
  return updatedAlumniMeet;
};

export const deleteAlumniMeetService = async (
  id: string
): Promise<alumniMeetDocument> => {
  const isAlumniMeetExist = await checkAlumniMeetsDao(id);
  console.log(isAlumniMeetExist)
  if (!isAlumniMeetExist) {
    throw new Error("Cannot delete alumni meet. Alumni meet not exist");
  }
  const deletedAlumniMeet = await deleteAlumniMeetDao(id);
  if (!deletedAlumniMeet)
    throw new Error("Deletion failed. Alumni may have already been deleted.");
  return deletedAlumniMeet;
};
