import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await academicDepartmentModel.create(payload);
  return result;
};

const singleAcademicDepartment = async (id: string) => {
  const result = await academicDepartmentModel.findById(id);
  return result;
};
const getAllAcademicDepartment = async () => {
  const result = await academicDepartmentModel
    .find({})
    .populate("academicFaculty");
  return result;
};
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await academicDepartmentModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const academicDepartmentService = {
  createAcademicDepartment,
  singleAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
};
