import React from 'react';
import StarRatings from 'react-star-ratings';
import ratingCalculations from './ratingCalculations.js';

const RatingSummary = ({ allRatings }) => {
  let { ratingAverage } = ratingCalculations(allRatings);
  console.log('rating Average: ', ratingAverage)
  return (
    <div>
      <b>Ratings &amp; Reviews </b>
      <div className='RatingSummary'>
        <div className='jstars'>
          <StarRatings
            rating={ratingAverage || 0}
            starRatedColor='#394a6d'
            numberOfStars={5}
            name='rating'
            starDimension='20px'
          />
        </div>
        <div className='overallRating'>{ratingAverage.toFixed(1)}</div>
      </div>
    </div>
  );
};

export default RatingSummary;
