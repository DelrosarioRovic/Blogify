import Comments from "./Comments";
import CreateComment from "../usercomment/CreateComment";
interface comment {
  id: string;
  numComments?: number
}

const UserComment = (props: comment) => {
  return (
    <div id={`${props.id}`} className="border-t px-12 max-md:px-3 py-3">
      <h1 className="mb-8"> Comments {`(${props?.numComments})`}</h1>
      <CreateComment type={"comment"} id={props.id}/>
      <div className="pt-8">
        <Comments />
      </div>
    </div>
  );
};

export default UserComment;
