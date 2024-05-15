import { useState, useEffect } from 'react';
import type { Image } from '../../@types/image';
import PageSelect from "../../components/Adios/PageSelect";
import '../styles/MansonryGrid.css';

interface PictureGridProps {
    initialImages: Image[];
    initialPage: number;
    initialTotalPages: number;
}

const PictureGrid = ({ initialImages, initialPage, initialTotalPages }: PictureGridProps) => {
    console.log("Initial Images:", initialImages); // Add this line to debug
    console.log("Initial Page:", initialPage); // Add this line to debug
    console.log("Initial Total Pages:", initialTotalPages); // Add this line to debug

    const [images, setImages] = useState<Image[]>(initialImages);
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(initialTotalPages);

    useEffect(() => {
        if (page === initialPage) return;

        const getImages = async () => {
            const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/messages/images?page=${page}&limit=20`);
            const jsonData = await response.json();
            setTotalPages(jsonData.meta.totalPages);
            const data = jsonData.data;
            const imageList = data?.map((item: any) => ({
                src: item.imageUrl || '',
                alt: item.content,
            }));
            setImages(imageList);
        };

        getImages();
    }, [page, initialPage]);

    // Function to handle image load
    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.classList.add('loaded');
    };

    return (
        <main className='space-y-16'>
            <div className="masonry-grid">
                {images?.map((image, index) => (
                    <div className="masonry-item" key={index}>
                        <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-auto rounded-xl" 
                            onLoad={handleImageLoad}
                        />
                    </div>
                ))}
            </div>
            <PageSelect page={page} setPage={setPage} totalPages={totalPages} />
        </main>
    );
};

export default PictureGrid;
