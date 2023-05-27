import { useEffect, useState } from "react";
import ApiCall from "../API/Api-call";
import { useParams } from "react-router-dom";
import { AuthUserInfo } from "../interface/hook/AuthUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { incrementRefreshCount } from "../redux/reducer/reUpdateOtherUser";
import axios from "axios";

interface userId {
    id?: string;
}

const seeProfile = (props: userId = {}) => {
    const dispatch = useDispatch();
    const refreshCount = useSelector((state: any) => state.reUpdateUserData.refreshCount);
    const [OtherUserData, setOtherUserData] = useState<AuthUserInfo | null>(null);
    const user = useParams(); 
    const fetchingUserData = async() => {
        let url = `https://blogify-api-server.vercel.app/route/specific-user/${props.id ? props.id : user.profileId}`
        const response =  await axios.get(url);
        if (response.status === 200) {
            setOtherUserData(response.data.user);
        }
    }

    useEffect(() => {
        fetchingUserData();
    }, [dispatch, refreshCount])

    const handleReUpdateOtherUserData = () => {
        dispatch(incrementRefreshCount());
    }

    return { OtherUserData, handleReUpdateOtherUserData }
}

export default seeProfile;