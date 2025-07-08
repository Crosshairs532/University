import { TBloodGroup, TGender } from "./admin.interface";

export const Gender: TGender[] = ["MALE", "FEMALE"];

export const BloodGroup: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const AdminSearchableFields = [
  "email",
  "id",
  "contactNo",
  "emergencyContactNo",
  "name.firstName",
  "name.lastName",
  "name.middleName",
];
