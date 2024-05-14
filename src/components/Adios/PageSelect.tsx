
import React from 'react';
import '../styles/MansonryGrid.css';

interface PageSelectProps {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

const PageSelect: React.FC<PageSelectProps> = ({ page, setPage, totalPages }) => {
    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className="pagination space-x-2">
            <button onClick={handlePrev} disabled={page === 1} className='bg-red-400 px-4 py-2 rounded-md text-white'>
                Prev
            </button>
            <span className='text-black'>Page {page} of {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages} className='bg-red-400 px-4 py-2 rounded-md text-white'>
                Next
            </button>
        </div>
    );
};

export default PageSelect;
