import { CustomRequest } from "../middleware/middlewareAuth";
import User from "../models/users.model";

const userAuth = async (req: CustomRequest): Promise<any> => {
  const userId = req.userId;
  const googleUserId = req.googleUserId;

  const userLocal = await User.findById(userId);
  const userProvider = googleUserId ? await User.findOne({ googleId: googleUserId }) : null;
  const localOrProvided: any = userLocal || userProvider;

  return localOrProvided;
}

export default userAuth;
