import { model, Schema } from "mongoose";
import { TUser, UserModelType } from "./user.interface";
import { configFiles } from "../../config";
import { date } from "zod";
const bcrypt = require("bcrypt");
const userSchema = new Schema<TUser, UserModelType>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["student", "admin", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// hash password before saving
userSchema.pre("save", async function (next) {
  console.log("Pre middleware");
  console.log(this);
  const user = this;
  try {
    const hash = await bcrypt.hash(user.password, 12);

    console.log({ hash });
    user.password = hash;
  } catch (err: any) {
    next(err);
  }
});

userSchema.post("save", function (doc, next) {
  doc.password = "";

  console.log({ doc });
  next();
});

userSchema.statics.isUserExist = async function (id: string) {
  return userModel.findOne({ id }).select("+password");
};

userSchema.statics.checkPassword = async function (loginPass, storedPass) {
  console.log(loginPass, storedPass);
  return await bcrypt.compare(loginPass, storedPass);
};

userSchema.statics.JwtIssueCheck = async function (
  passwordChangeDate,
  issueDate
) {
  return new Date(passwordChangeDate).getTime() / 1000 > issueDate;
};

export const userModel = model<TUser, UserModelType>("User", userSchema);
