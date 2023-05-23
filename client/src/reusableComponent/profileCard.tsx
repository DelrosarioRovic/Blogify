interface profileCardProps {
    avatar: React.ReactNode;
    displayName: string;
    bio: string;
}

const profileCard = (props: profileCardProps) => {
    return (
        <div className="hidden md:flex flex-row gap-x-3 z-50 bg-white absolute top-0 left-0 min-w-[15rem] p-3 rounded-md border-[0.5px] border-gray-200 shadow-xl text-sm overflow-hidden
        before:absolute before:top-0 before:left-0 before:w-full before:h-10 before:bg-slate-950
        ">
            <div className="z-10">
                {props.avatar}   
            </div>
            <div className="z-10 w-full">
                <div className="w-full gap-y-2">
                    <p className="text-white">
                        {props.displayName}
                    </p>
                    <button className="bg-blue-500 w-full mt-4 rounded-md text-white p-2">
                        follow
                    </button>
                </div>
                <div className="z-10 w-full mt-2">
                    <p className="text-black">
                        {props.bio ? props.bio.substring(20, 0) : "404 bio not found."}
                        {props.bio.length > 20 && "..."}
                    </p>
                </div>
               
            </div>
        </div>
    )
}

export default profileCard;