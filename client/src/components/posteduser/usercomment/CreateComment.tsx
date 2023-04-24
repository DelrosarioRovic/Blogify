import React from 'react'

 const CreateComment = () => {
  return (
    <div className="flex gap-6 flex-row">
    <div className="h-8 w-8 rounded-full bg-black"></div>
    <form className="w-full">
      <textarea
        className="w-full border p-2 resize-y"
        id=""
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