import React, { useState } from "react";
import UserProfileMenu from "./userProfileMenu";
import UserAvatar from "../../reusableComponent/userAvatar";
export interface UserAccountInfo {
  _id: string;
  email: string;
  displayName: string;
  profilePicture: string | null;
}

interface UserAccountInfoProps {
  user: UserAccountInfo;
  setIsLogin: (value: boolean) => void;
}

const UserProfile: React.FC<UserAccountInfoProps> = (props) => {
  const [isProfileClick, setIsProfileClick] = useState<boolean>(false);

  return (

  );
};

export default UserProfile;
