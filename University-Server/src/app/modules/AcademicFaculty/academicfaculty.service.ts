import { TAcademicFaculty } from "./academicfaculty.interface";
import { AcademicFaculty } from "./academicfaculty.model";

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  // check if same name academic faculty exist or not
  const isExist = await AcademicFaculty.findOne({
    name: payload.name,
  });

  if (isExist) {
    throw new Error("Academic Faculty Already Exists");
  }
  const result = await AcademicFaculty.create(payload);
  return result;
};

const singleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const getAllAcademicFaculty = async () => {
  const result = await AcademicFaculty.find({});
  console.log(result);
  return result;
};
const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const academicFacultyService = {
  createAcademicFaculty,
  singleAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
};
