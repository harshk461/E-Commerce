import React from 'react';

const StarRating = ({ rating }: { rating: number }) => {
    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-500">&#9734;&#9733;</span>);
        }

        const remainingStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 1; i <= remainingStars; i++) {
            stars.push(<span key={`empty-${i}`} className="text-gray-300">&#9734;</span>);
        }

        return stars;
    };

    return (
        <div className="flex items-center">
            {renderStars()}
        </div>
    );
};

export default StarRating;
