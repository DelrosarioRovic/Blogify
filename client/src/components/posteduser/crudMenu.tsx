import React,{ useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { PostObj } from '../../interface/hook/PostObj';
import DeletePost from './deletePost';
import DeleteCR from './deleteComment&Reply';

interface crudMenuLink {
    type: string;
    toEdit: string;
    toShare: string;
    //post data
    data?: PostObj;
    //reply or comment
    commentId?:string;
    typeCR?:string;
    postId?: string;
    content?: string;
    //reply
    parentCommentId?: string;
}

 
const crudMenu:React.FC <crudMenuLink> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //comment and reply function auto focus on input
    const focusRef = useRef(null);

    return (
        <div className='relative flex'> 
            <button onClick={()=> setIsOpen(!isOpen)}>
                <BsThreeDotsVertical size={22}/>
            </button>
            {isOpen && (
                <div className="z-50 bg-white absolute top-[2rem] right-0 w-[15rem] max-sm:w-full p-2 rounded-md border-[0.5px] border-gray-200 shadow-xl text-sm">
                    <ul className="block opacity-80 text-gray-800 py-1">
                        <li className="hover:bg-gray-200 duration-300 p-1 rounded-md flex">
                            {props.type === "post" ? (
                                <Link className='w-full h-full block py-1' to={props.toEdit} state={props.data}>Edit</Link>
                            ) : (
                                <Link className='w-full h-full block py-1'
                                    to={props.toEdit} 
                                    state={props.parentCommentId && props.typeCR ==="reply" && props.postId ? 
                                    { commentId: props.commentId,
                                      typeCR: props.typeCR, 
                                      parentCommentId: props.parentCommentId, 
                                      commentContent: props.content, 
                                      postId: props.postId,
                                      focus:focusRef 
                                    } : 
                                    { commentId: props.commentId,
                                      typeCR: props.typeCR,
                                      commentContent: props.content,
                                      postId: props.postId,
                                      focus:focusRef 
                                    } 
                                }>Edit</Link>
                            )}
                        </li>
                        <li className="hover:bg-gray-200 duration-300 p-1 rounded-md">
                            {props.data && props.type === "post" ? (
                                <DeletePost id={props.data._id}/>
                            ) : (
                                props.parentCommentId ?(
                                    <DeleteCR id={props.commentId} typeCR={props.typeCR} parentCommentId={props.parentCommentId}/>
                                ) : (
                                    <DeleteCR id={props.commentId} typeCR={props.typeCR} />
                                )
                               
                            )}
                        
                        </li>
                        <li className="hover:bg-gray-200 duration-300 p-1 py-2 rounded-md">
                            <Link to={props.toShare}>Share</Link>
                        </li>
                    </ul>
                </div>
            )}
            
        </div>
        
    )
}

export default crudMenu;