import { error } from "console";
import { configFiles } from "../config";

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
cloudinary.config({
  cloud_name: configFiles.cloudinary.cloudinary_name,
  api_key: configFiles.cloudinary.cloudinary_api,
  api_secret: configFiles.cloudinary.cloudinary_secret,
});

export const Cloudinary = (imageName: string, path: string) => {
  const cloudOptions = {
    public_id: imageName,
  };
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      cloudOptions,
      (err: any, result: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          fs.unlink(path, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log(`${imageName} deleted...`);
            }
          });
        }
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
