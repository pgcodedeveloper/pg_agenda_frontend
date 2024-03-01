import React from 'react'

const NoTasks = ({text}) => {
    return (
        <div className='mt-5'>
            <p className="text-gray-700 dark:text-gray-400 text-center mt-2 text-sm bg-slate-300/55 py-2 w-[85%] mx-auto rounded-md">{text}</p>
        </div>
    )
}

export default NoTasks
