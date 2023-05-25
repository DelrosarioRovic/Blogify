import ApiCall from "../API/Api-call";
import useAuthentication from "../hooks/isAuthenticated";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import seeProfile from "../hooks/see-user-profile";

interface followBtnProps {
    id?: string;
    following?: string[];
}

const followBtn = (props: followBtnProps) => {
   
    const { handleReUpdateOtherUserData } = seeProfile(props.id ? {id: props.id} : {});
    const {data, authenticated} = useAuthentication();

    const handleFollowBtn = async () => {
        try {
            const otherUserId = props.id; 
            const currentUserId = data?._id; 

            const url = `https://blogify-api-server.vercel.app/follow?otherUserId=${otherUserId}&currentUserId=${currentUserId}`;
            const response: any = await ApiCall("get", url);
            response.status === 200 && (
                handleReUpdateOtherUserData()
            );
        } catch (error) {
            console.log(error);
        }
    }
   
    return (
    <div onClick={handleFollowBtn} className="cursor-pointer w-full block">
        {authenticated && props.following?.includes(data?._id || "") ? (
            <div className="flex flex-row items-center gap-2">
                <RiUserUnfollowLine />
                <span>
                    Unfollow
                </span>
            </div>
            
        ) : (
            <div className="flex flex-row items-center gap-2">
                <RiUserFollowLine />
                <span>
                    Follow
                </span>
            </div>
        )}
    </div>
    )
}

export default followBtn;