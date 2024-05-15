
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
        <div className="pagination space-x-4">
            <button onClick={handlePrev} disabled={page === 1} className='bg-black px-4 py-2 rounded-lg text-white'>
            ← Prev
            </button>
            <span className='text-black font-normal'>Page {page} of {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages} className='bg-black px-4 py-2 rounded-lg text-white'>
                Next →
            </button>
        </div>
    );
};

export default PageSelect;
