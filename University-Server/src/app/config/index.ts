require("dotenv").config({ path: [process.cwd(), ".env"] });

export const configFiles = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary: {
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api: process.env.CLOUDINARY_KEY,
    cloudinary_secret: process.env.CLOUDINARY_SECRET,
  },
  superAdmin: {
    super_admin_pass: process.env.SUPER_ADMIN_PASSWORD,
  },
};
