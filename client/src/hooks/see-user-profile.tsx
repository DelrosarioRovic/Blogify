import { useEffect, useState } from "react";
import ApiCall from "../API/Api-call";
import { useParams } from "react-router-dom";
import { AuthUserInfo } from "../interface/hook/AuthUserInfo";

const seeProfile = () => {
    const [OtherUserData, setOtherUserData] = useState<AuthUserInfo | null>(null);;
    const user = useParams(); 
    const fetchingUserData = async() => {
        let url = `http://localhost:4000/route/specific-user/${user.profileId}`
        const response = await ApiCall("get", url);
        if (response.status === 200) {
            setOtherUserData(response.data.user);
        }
    }

    useEffect(() => {
        fetchingUserData();
    }, [])

    return { OtherUserData }
}

export default seeProfile;