import { ChevronRight } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

interface PathHeaderProps {
    path: string;
}

const PathHeader: React.FC<PathHeaderProps> = ({ path }) => {
    const segments = path.split('/').filter(Boolean);

    const capitalize = (s: string) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
        <div className='w-full px-4 py-4 lg:px-[40px] text-lg bg-[url("/cover.jpeg")] bg-cover bg-no-repeat'>
            <span className='flex items-center text-white'>
                {segments.map((segment, i) => (
                    <React.Fragment key={i}>
                        {i > 0 && <ChevronRight className='mx-1' />}
                        <span className={`text-md ${i !== segments.length - 1 ? 'hover:text-blue-400 text-white' : 'text-green-200'}`}>
                            {i !== segments.length - 1 ? (
                                <Link href={`/${segments.slice(0, i + 1).join('/')}`}>
                                    <h1>{capitalize(segment).split("-").join(" ")}</h1>
                                </Link>
                            ) : (
                                <span>{capitalize(segment).split("-").join(" ")}</span>
                            )}
                        </span>
                    </React.Fragment>
                ))}
            </span>

        </div>
    );
}

export default PathHeader;
