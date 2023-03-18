import React, { useState, useRef, useCallback } from 'react';
import useBookSearch from './hooks/useBookSearch';

const MainNew = () => {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const { error, books, loading, hasMore } = useBookSearch(query, pageNumber);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastBookElementRef = useCallback(
        (node: any) => {
            console.log(node);

            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                    console.log('visible');
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(e.target.value);
        setPageNumber(1);
    };

    return (
        <>
            <div style={{ textAlign: 'left' }}>
                <input type='text' onChange={handleSearch} value={query} />
                {books.map((book, index) => {
                    if (books.length === index + 1) {
                        return (
                            <div ref={lastBookElementRef} key={book}>
                                {book}
                            </div>
                        );
                    } else return <div key={book}>{book}</div>;
                })}
                <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error...'}</div>
            </div>
        </>
    );
};

export default MainNew;
