// components/Pagination.tsx
'use client';

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-2 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-2 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
