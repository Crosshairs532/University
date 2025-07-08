import { unknown } from "zod";
import { userModel } from "../user.model";

const lastFaculty = async () => {
  const lastFaculty = await userModel
    .findOne(
      {
        role: "faculty",
      },
      {
        id: 1,
        _id: 0,
      }
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyID = async () => {
  let facultyId = (0).toString(); // 0
  const id = await lastFaculty();
  if (id) {
    facultyId = id as unknown as string;
  }
  const incrementId = (Number(facultyId) + 1).toString().padStart(4, "0");
  const FacultyId = `F-${incrementId}`;

  return FacultyId;
};
