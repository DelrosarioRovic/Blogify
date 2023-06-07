import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthUserInfo } from "../interface/hook/AuthUserInfo";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { ImageUploader } from "../reusableComponent/uploadPicture";
import ApiCall from "../API/Api-call";
import useAuthentication from "../hooks/isAuthenticated";

const ProfileSettings:React.FC = () => {
    const { handleReUpdateUserData } = useAuthentication();
    //use for sending state from other location
    const location = useLocation();
    const updateCurrentData: AuthUserInfo = location.state;

    const [email, setEmail] = useState<string>(updateCurrentData ? updateCurrentData.email : '');
    const [addPic, setAddPic] = useState<string>(updateCurrentData && updateCurrentData.profilePicture ? updateCurrentData.profilePicture : '');
    const [bio, setBio] = useState<string>(updateCurrentData && updateCurrentData.bio ? updateCurrentData.bio : 'default bio');
    const [displayName, setDisplayName] = useState<string>(updateCurrentData ? updateCurrentData.displayName : '');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await ApiCall(
                "post", "https://blogify-api-server.vercel.app/auth/update-profile", 
                { id: updateCurrentData._id ,email, bio, profilePicture:addPic, displayName });
            response.status === 200 ? (
                handleReUpdateUserData(),
                toast.success(response.data.message)
            ): ( toast.warning(response.data.message));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="">
            <h1 className="text-3xl font-semibold my-5">Settings</h1>
            <div className="max-w-4xl border-gray-200 border rounded-sm shadow-md px-5 py-2">
                <h2 className="text-2xl font-medium">User</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 py-3">
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="changeEmail">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="changeEmail" id="changeEmail" className="bg-gray-200 py-2 px-1 rounded-md text-gray-800 text-sm" />
                        <label htmlFor="displayName">Display Name</label>
                        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} type="text" name="displayName" id="displayName" className="bg-gray-200 py-2 px-1 rounded-md text-gray-800 text-sm"/>
                        <label htmlFor="bio">Bio</label>
                        <input value={bio} onChange={(e) => setBio(e.target.value)} type="text" name="bio" id="bio" className="bg-gray-200 py-2 px-1 rounded-md text-gray-800 text-sm" />
                    </div>
                    <ImageUploader buttonName="Upload Profile" setAddPic={setAddPic}/>
                    <button type="submit" className="bg-blue-500 p-2 rounded-md">Save Profile Information</button>
                </form>
            </div>
        </div>
        
    )
}

export default ProfileSettings;