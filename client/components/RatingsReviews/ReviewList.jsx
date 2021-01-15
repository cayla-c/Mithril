import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddReview from './AddReview.jsx';
const getReviews = (pId) => {
  let url = 'http://localhost:3000/proxy/api/fec2/hratx/reviews/?product_id=' + pId;
  return axios.get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export const ReviewList = (props) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(<div>Loading reviews...</div>);
  const [moreReviews, setMoreReviews] = useState('');
  if (loading) {
    getReviews(props.id)
      .then(((data) => {
        setLoading(false);
        setReviews(data.data.results.map((result) => {
          return (
            <div className='ReviewList' key={result.review_id}>
              <div className="IndividualReview">
                <div className="ReviewText">{result.summary}</div>
                <div className="jStars">Stars Placeholder</div>
                <div className="jDate">Date Placeholder</div>
              </div>
            </div>
          );
        }));
      }));
  }
  return (
    <div className='ReviewList'>
      <div>{reviews}</div>
      <div className='jButtonContainer'>
        <button className='jButton'>More Reviews</button>
        <button className='jButton'>Add A Review</button>
      </div>
    </div>
  );
};