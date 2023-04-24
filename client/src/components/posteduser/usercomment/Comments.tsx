import React, { useState } from "react";
import CommentCards from "./CommentCards";
import CreateComment from "./CreateComment";
const usersComments = () => {
  const [firstComment, setfirstComment] = useState(true);
  const [secondComment, setSecondComment] = useState(true);
  const [thirdComment, setThirdComment] = useState(true);

  const [fisrtreply, SetFirstReply] = useState(true)
  const [secondreply, SetSecondReply] = useState(true)


  return (
    <>
      <CommentCards
        handleReply={() => setfirstComment((preValue) => !preValue)}
        handleComment={() => SetFirstReply((preValue => !preValue))}
        like={1}
        comment={2}
        img="A"
        name={`Alexiess Manalastas`}
        date={`March 21, 2000`}
        Comment={`You might want to consider the case that 32°F equates to 0°C. Your comment works well. But might confuse some.`}
      />
       <div className={`${fisrtreply ? "hidden" : ""} mt-3 `}>
        <CreateComment />
        </div>  

      <div className={`${firstComment ? "hidden" : " "} pl-9 gap-3`}>
        <CommentCards
          handleReply={() => setSecondComment((preValue) => !preValue)}
          handleComment={() => SetSecondReply((preValue => !preValue))}
          like={1}
          comment={1}
          img="J"
          name={`Jono Nombeng`}
          date={`November 1, 2000`}
          Comment={`Ow come on you so bad at design😥`}
        />
        
        <div className={`${secondComment ? "hidden" : " "} pl-10 gap-3`}>
          <CommentCards
            handleReply={() => setSecondComment((preValue) => !preValue)}
            handleComment={() => SetSecondReply((preValue => !preValue))}
            like={1}
            comment={0}
            img="J"
            name={`Jhon doe Cutes`}
            date={`January 1, 2050`}
            Comment={`Good job 🤣😥😥`}
          />
        </div>


        <CommentCards
          handleReply={() => setThirdComment((preValue) => !preValue)}
          handleComment={() => SetSecondReply((preValue => !preValue))}
          like={5}
          comment={0}
          img="B"
          name={`Bochiks Cutie`}
          date={`February 2, 6000`}
          Comment={`Nice good work much better to make some padding right thanks :) `}
        />
        <div className={`${thirdComment ? "hidden" : " "} pl-12 gap-3`}></div>
      </div>
    </>
  );
};

export default usersComments;
