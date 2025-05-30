import { studentModel } from "./student.model";

const getAllStudentsDB = async () => {
  try {
    const allStudents = await studentModel.find({});
    return allStudents;
  } catch (error) {
    throw new Error("Error fetching students from the database");
  }
};

export const studentService = {
  getAllStudentsDB,
};
