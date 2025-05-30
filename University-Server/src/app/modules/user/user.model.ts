import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { configFiles } from "../../config";
const bcrypt = require("bcrypt");
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
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

export const userModel = model<TUser>("User", userSchema);
