import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

AcademicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await academicDepartmentModel.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new Error("This department is already exist!");
  }

  next();
});

AcademicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (!docToUpdate) {
    throw new Error("This department does not exist!");
  }

  next();
});

export const academicDepartmentModel = model(
  "academicDepartment",
  AcademicDepartmentSchema
);
