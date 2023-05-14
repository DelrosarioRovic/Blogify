import React from 'react'
import { AiOutlineComment  } from 'react-icons/ai'

interface nOfComments {
  numComments?: number
}

function comment(props: nOfComments) {

  return (
    <div className=" flex items-center text-2xl cursor-pointer">
    <AiOutlineComment />
    <span className="text-[.75rem]">{props?.numComments}</span>
  </div>

  )
}

export default comment