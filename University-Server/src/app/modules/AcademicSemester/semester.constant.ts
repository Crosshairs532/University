import {
  Month,
  TAcademicSemesterCode,
  TAcademicSemesterName,
} from "./semester.interface";

export const Months: Month[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];
export const AcademicSemesterName: TAcademicSemesterName[] = [
  "Spring",
  "Summer",
  "Fall",
];
