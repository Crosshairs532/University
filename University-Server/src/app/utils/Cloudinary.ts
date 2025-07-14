import { configFiles } from "../config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const multer = require("multer");

cloudinary.config({
  cloud_name: configFiles.cloudinary.cloudinary_name,
  api_key: configFiles.cloudinary.cloudinary_api,
  api_secret: configFiles.cloudinary.cloudinary_secret,
});

export const Cloudinary = (
  imageName: string,
  path: string
): Promise<Record<string, unknown>> => {
  const cloudOptions = {
    public_id: imageName,
  };
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName.trim(),
      },
      function (error: any, result: any) {
        if (error) {
          console.log("inside");
          console.log(error);
          reject(error);
        }
        resolve(result);
        fs.unlink(path, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`${imageName} deleted...`);
          }
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
