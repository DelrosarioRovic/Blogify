import ApiCall from "../API/Api-call";
import useAuthentication from "../hooks/isAuthenticated";

interface followBtnProps {
    id?: string;
}

const followBtn = (props: followBtnProps) => {
    const {data} = useAuthentication();
    const handleFollowBtn = async () => {
        try {
            const otherUserId = props.id; 
            const currentUserId = data?._id; 
            const url = `http://localhost:4000/follow?otherUserId=${otherUserId}&currentUserId=${currentUserId}`;
            const response = ApiCall("get", url);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleFollowBtn} className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-md">
            Follow
        </button>
    )
}

export default followBtn;