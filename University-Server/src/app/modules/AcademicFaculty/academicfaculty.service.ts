import { TAcademicFaculty } from "./academicfaculty.interface";
import { AcademicFaculty } from "./academicfaculty.model";

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const singleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const getAllAcademicFaculty = async () => {
  const result = await AcademicFaculty.find({});
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
