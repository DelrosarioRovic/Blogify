import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const skeletonSinglePost = () => {
    return <>
            <div className="flex justify-between">
                <div className="flex gap-6">
                    <Skeleton circle={true} width={"2.7rem"} height={"2.7rem"} />
                    <div>
                        <p><Skeleton width={"10rem"} height={"1rem"} /></p>
                        <p><Skeleton width={"7rem"} height={".75rem"} /></p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <Skeleton width={"2rem"} height={"1rem"}/>
                    <Skeleton width={"2rem"} height={"1rem"}/>
                </div>
            </div>
            <div className="my-6">
                <h1 className="text-[2rem] font-extrabold">
                    <Skeleton width={"100%"} height={"1.5rem"} />
                </h1>
                <div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {[...Array(5)].map((_, index) => (
                            <Skeleton
                            key={index}
                            width={index === 2 || index === 4 ? "50%" : "100%"}
                            height={"1rem"}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>                    
}

export default skeletonSinglePost;