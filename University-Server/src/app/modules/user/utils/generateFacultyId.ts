import { unknown } from "zod";
import { userModel } from "../user.model";

const lastFaculty = async () => {
  const lastFaculty = await userModel
    .find(
      {
        role: "faculty",
      },
      {
        id: 1,
      }
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id : undefined;
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
