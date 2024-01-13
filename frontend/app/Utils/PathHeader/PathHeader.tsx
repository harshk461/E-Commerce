import React from 'react'

export default function PathHeader({ path }: { path: string }) {
    return (
        <div className='w-full px-4 py-4 lg:px-[40px] text-lg bg-gray-100'>
            {path}
        </div>
    )
}
