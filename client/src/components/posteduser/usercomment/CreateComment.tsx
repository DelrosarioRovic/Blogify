import React from 'react'
import UserAvatar from '../../reusableComponent/userAvatar';
import useAuthentication from '../../../hooks/isAuthenticated';


 const CreateComment = () => {
  const { authenticated ,data } = useAuthentication();
  return (
    <div className="flex gap-6 flex-row">
      <div className='rounded-full bg-slate-600 h-8 w-8 flex items-center justify-center'>
        {authenticated ? ( <UserAvatar
            profilePicture={data?.profilePicture}
            displayName={data?.displayName}
          />): ("D") }
       
      </div>
   
    <form className="w-full">
      <textarea
        className="w-full border p-2 resize-y"
        id="#"
        placeholder="Comment"
        rows={4}
      ></textarea>
      <button className="bg-slate-600 px-6 py-2 text-white rounded-lg">
        Submit
      </button>
    </form>
  </div>
  )
}
export default CreateComment;