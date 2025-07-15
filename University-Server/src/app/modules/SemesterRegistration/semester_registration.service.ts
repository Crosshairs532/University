import status from "http-status";
import AppError from "../../utils/AppError";
import { AcademicSemester } from "../AcademicSemester/semester.model";
import { TSemesterRegistration } from "./semester_registration.interface";
import { semesterRegistrationModel } from "./semester_registration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;
  const isSemesterExist = await AcademicSemester.findById(academicSemester);

  if (!isSemesterExist) {
    throw new AppError(status.BAD_REQUEST, "Academic Semester do not exist");
  }
  const isSemesterRegistered = await semesterRegistrationModel.findById(
    academicSemester
  );
  if (isSemesterRegistered) {
    throw new AppError(status.CONFLICT, "This Semester already exists");
  }

  // check if there is any upcoming or ongoing semester

  const isUpcomingOrOngoing = await semesterRegistrationModel.findOne({
    status: {
      $in: [
        "UPCOMING",

        "ONGOING",
        // {
        //   status: "UPCOMING",
        // },
        // {
        //   status: "ONGOING",
        // },
      ],
    },
  });

  if (isUpcomingOrOngoing) {
    throw new AppError(
      status.BAD_REQUEST,
      `There is already a ${isUpcomingOrOngoing.status} semester`
    );
  }

  const result = await semesterRegistrationModel.create(payload);

  return result;
};

const getAllRegisteredSemester = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(
    semesterRegistrationModel.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .fields()
    .paginate();
  return result.modelQuery;
};
const singleRegisteredSemester = async (id: string) => {
  const result = await semesterRegistrationModel.findById(id);
  if (!result) {
    throw new AppError(status.BAD_REQUEST, "No semester found!");
  }

  return result;
};
const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const registeredSemester = await semesterRegistrationModel.findById(id);

  if (!registeredSemester) {
    throw new AppError(
      status.BAD_REQUEST,
      "Requested Semester Does not exist!"
    );
  }
  if (
    // registeredSemester.status == "ONGOING" ||
    registeredSemester.status == "ENDED"
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `This semester is already ${registeredSemester.status}`
    );
  }
  if (registeredSemester.status == "ONGOING" && payload.status == "UPCOMING") {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not directly update ${registeredSemester} to ${payload.status}`
    );
  }
  if (registeredSemester.status == "UPCOMING" && payload.status == "ENDED") {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not directly update ${registeredSemester} to ${payload.status}`
    );
  }

  const result = await semesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    }
  );

  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllRegisteredSemester,
  updateSemesterRegistration,
  singleRegisteredSemester,
};
