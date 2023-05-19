import UserAvatar from "./userAvatar";
import { ProfilePictureProps } from "../../interface/props/profilePictureProps";

interface profileLayOutProps extends ProfilePictureProps {

}

const ProfileLayOut = (props: profileLayOutProps) => {
    return (
        <div className="h-screen absolute inset-0 top-[12.5%]">
            <div className="bg-slate-950 h-1/4 w-full relative">
                <div className="max-w-4xl mx-auto relative h-full">
                    <div className="rounded-full bg-white w-36 h-36 absolute -bottom-[45%] left-1/2 transform -translate-x-1/2 flex justify-center items-center p-2">
                        <UserAvatar 
                            displayName={props.displayName}
                            profilePicture={props.profilePicture}
                            size={props.size}
                            textSize={props.textSize}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileLayOut;