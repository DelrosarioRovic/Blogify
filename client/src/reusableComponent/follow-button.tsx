import ApiCall from "../API/Api-call";
import useAuthentication from "../hooks/isAuthenticated";
import seeProfile from "../hooks/see-user-profile";


interface followBtnProps {
    id?: string;
    following?: string[];
}

const followBtn = (props: followBtnProps) => {
    const { handleReUpdateOtherUserData } = seeProfile();
    const {data, authenticated} = useAuthentication();
    const handleFollowBtn = async () => {
        try {
            const otherUserId = props.id; 
            const currentUserId = data?._id; 
            const url = `http://localhost:4000/follow?otherUserId=${otherUserId}&currentUserId=${currentUserId}`;
            const response: any = await ApiCall("get", url);
            response.status === 200 && (
                handleReUpdateOtherUserData()
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleFollowBtn} className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-md">
            {authenticated && props.following?.includes(data?._id || "") ? (
                "following"
            ) : (
                "follow"
            )}
        </button>
    )
}

export default followBtn;