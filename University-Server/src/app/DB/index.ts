import { configFiles } from "../config";
import { userModel } from "../modules/user/user.model";

const superAdminData = {
  id: "0001",
  email: "super-admin@gmail.com",
  password: configFiles.superAdmin.super_admin_pass,
  needsPasswordChange: false,
  role: "super-admin",
  status: "in-progress",
};

const superAdmin = async () => {
  const isSuperAdminExist = await userModel.findOne({ id: superAdminData.id });
  if (!isSuperAdminExist) {
    userModel.create(superAdminData);
  }
};
export default superAdmin;
