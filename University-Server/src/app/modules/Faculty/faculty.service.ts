import { facultyModel } from "./faculty.model";

const getAllFaculty = async () => {
  const result = await facultyModel.find({ isDeleted: true });
  return result;
};

const singleFaculty = async (facultyId: string) => {
  const result = await facultyModel.findOne({ id: facultyId });
  return result;
};

const updateFaculty = async (facultyId: String, facultyData: any) => {
  const result = await facultyModel.findOneAndUpdate(
    { id: facultyId },
    facultyData
  );

  return result;
};

const deleteFaculty = async (facultyId: String) => {
  const result = await facultyModel.findOneAndUpdate(
    { id: facultyId },
    {
      isDeleted: true,
    }
  );

  return result;
};

export const facultyService = {
  getAllFaculty,
  singleFaculty,
  updateFaculty,
  deleteFaculty,
};
