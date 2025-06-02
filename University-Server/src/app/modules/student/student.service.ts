import { studentModel } from "./student.model";

const getAllStudentsDB = async () => {
  try {
    const allStudents = await studentModel.find({});
    return allStudents;
  } catch (error) {
    throw new Error("Error fetching students from the database");
  }
};

const getSingleStudent = async (studentId: any) => {
  const result = await studentModel.findById(studentId);
  return result;
};

export const studentService = {
  getAllStudentsDB,
  getSingleStudent,
};
