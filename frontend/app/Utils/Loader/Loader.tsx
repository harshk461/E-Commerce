import React from 'react'

export default function Loader() {
    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-45 flex justify-center items-center z-[11]'>
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    )
}
