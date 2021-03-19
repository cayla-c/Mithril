import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [curProduct, setCurProduct] = useState(null);
  const [curStyle, setCurStyle] = useState(null);
  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    getSingleProduct(21111);
  }, []);

  const getSingleProduct = (prodID) => {
    let tempProduct, tempStyle;
    let urls = [
      `/proxy/api/fec2/hratx/products/${prodID}`,
      `/proxy/api/fec2/hratx/products/${prodID}/styles`,
      `/proxy/api/fec2/hratx/reviews?product_id=${prodID}`
    ];
    Promise.all(
      urls.map((url) => {
        return axios.get(url).then((res) => res.data);
      })
    )
      .then((results) => {
        //Product Details
        tempProduct = results[0];
        //Product Styles
        tempProduct.styles = results[1];
        tempStyle = tempProduct.styles.results[0];

        tempProduct.styles.results.forEach((prod) => {
          if (prod['default?']) {
            tempStyle = prod;
          }
        });

        //Product Rating
        let totalRatings = results[2].results.length;
        let curRatings = 0;
        results[2].results.forEach(({ rating }) => {
          curRatings += rating;
        });
        tempProduct.rating = curRatings / totalRatings;

        //Set State
        setCurProduct(tempProduct);
        setCurStyle(tempStyle);
      })
      .catch((err) => console.log(err));
  };

  const getProductRating = (id) => {
    return axios
      .get('/proxy/api/fec2/hratx/reviews?product_id=' + id)
      .then(({ data }) => {
        let totalRatings = data.results.length;
        let curRatings = 0;
        data.results.forEach(({ rating }) => {
          curRatings += rating;
        });
        return curRatings / totalRatings;
      })
      .catch((err) => err);
  };

  const updateCurStyle = (prodStyle) => {
    setCurStyle(prodStyle);
  };

  return (
    <ProductContext.Provider
      value={{
        curProduct,
        curStyle,
        updateCurStyle,
        getProductRating,
        zoomIn,
        setZoomIn,
        getSingleProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
