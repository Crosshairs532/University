require("dotenv").config({ path: [process.cwd(), ".env"] });

export const configFiles = {
  port: process.env.PORT,
  url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
};
