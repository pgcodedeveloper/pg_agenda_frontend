import React from 'react'
import { Spinner } from 'flowbite-react';

const QuestionAlert = ({text,buttons,operations,cargando}) => {
    return (
        <div className='fixed top-2 right-0 left-0 w-full flex items-center justify-center z-[20]'>
            <div role="alert" className="alert w-[650px] py-3 px-2 rounded-md animate-[fade-down] animate-duration-[.5s] animate-once">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className='text-sm'>{text}</span>
                <div className='flex items-center gap-x-2'>
                    {buttons?.map((btn,index) => (
                        <button key={index} className={`btn btn-sm ${btn.type}`}
                            onClick={() => operations[index]()}
                        >{btn.text} {index === 0 && (
                            <>
                                {cargando && <span className="ml-2 loading loading-spinner text-[#0284C7]"></span>}
                            </>
                        )}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuestionAlert