export type TSemesterRegistration = {
  academicSemester: String;
  startDate: Date;
  endDate: Date;
  status: "UPCOMING" | "ENDED" | "ONGOING";
  minCredit: Number;
  maxCredit: Number;
};
