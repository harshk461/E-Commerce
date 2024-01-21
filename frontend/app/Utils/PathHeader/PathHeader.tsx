import { ChevronRight } from 'lucide-react';
import React from 'react';

interface PathHeaderProps {
    path: string[];
}

const PathHeader: React.FC<PathHeaderProps> = ({ path }) => {
    return (
        <div className='w-full px-4 py-4 lg:px-[40px] text-lg bg-gray-100'>
            <span className='flex items-center'>
                {path.map((item, i) => (
                    <>
                        {i > 0 && <ChevronRight className='mx-1' />}
                        <span className='font-semibold'>{item}</span>
                    </>
                ))}
            </span>
        </div>
    );
}

export default PathHeader;
