import React,{ useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { PostObj } from '../../interface/hook/PostObj';
import DeletePost from './deletePost';

interface crudMenuLink {
    type: string;
    toEdit: string;
    toDelete: string;
    toShare: string;
    //post data
    data?: PostObj;
}

 
const crudMenu:React.FC <crudMenuLink> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <div className='relative flex'> 
            <button onClick={()=> setIsOpen(!isOpen)}>
                <BsThreeDotsVertical size={22}/>
            </button>
            {isOpen && (
                <div className="z-50 bg-white absolute top-[2rem] right-0 w-[15rem] max-sm:w-full p-2 rounded-md border-[0.5px] border-gray-200 shadow-xl text-sm">
                    <ul className="block opacity-80 text-gray-800 py-1">
                        <li className="hover:bg-gray-200 duration-300 p-1 py-2 rounded-md">
                            {props.type === "post" ? (
                                <Link to={props.toEdit} state={props.data}>Edit</Link>
                            ) : (
                                <Link to={props.toEdit} state={props.toEdit}>Edit</Link>
                            )}
                        </li>
                        <li className="hover:bg-gray-200 duration-300 p-1 py-2 rounded-md">
                            {props.data && props.type === "post" ? (
                                <DeletePost type={props.toDelete} id={props.data._id}/>
                            ) : (
                                <button>Delete</button>
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