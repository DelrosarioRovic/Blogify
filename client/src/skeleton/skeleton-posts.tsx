import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const skeletonPosts = [...Array(4)].map((_, index) => (
    <div
      key={index}
      className="w-full max-w-2xl mx-auto mt-1 overflow-hidden sm:rounded-md sm:border max-sm:border-y border-gray-300 relative shadow-md"
    >
      <div className="bg-stone-100 bg-opacity-[.4] max-md:px-4 active:outline active:outline-[2px] active:outline-slate-700 flex flex-col gap-4 md:px-12 py-4">
        <div className="flex items-center gap-3">
          <Skeleton circle={true} width={"2.5rem"} height={"2.5rem"} />
          <div className="w-[80%] block">
            <Skeleton width={"100%"} height={"1.5rem"} />
          </div>
        </div>
        <Skeleton count={5} />
      </div>
    </div>
  ));

  export default skeletonPosts;