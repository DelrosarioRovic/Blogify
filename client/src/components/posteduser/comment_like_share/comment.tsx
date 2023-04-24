import React from 'react'
import { AiOutlineComment  } from 'react-icons/ai'
interface comments {
    comments: number
}
function comment(props: comments) {
  return (
    <div className=" flex items-center text-2xl cursor-pointer">
    <AiOutlineComment />
    <span className="text-[.75rem]">{props.comments}</span>
  </div>

  )
}

export default comment