import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Modal, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import ratingCalculations from '../RatingsReviews/ratingCalculations.js';
// import RatingSummary from '../RatingsReviews/RatingSummary.js';
// import CompareIcon from './CompareIcon.js';
// import { ReactComponent as Icon } from './noun_Compare_329808.svg';

export const HooksRelatedItems = () => {
  const { curProduct, getSingleProduct } = useContext(ProductContext);
  const [relatedProductIds, setRelatedProductIds] = useState([]);
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [combinedFeatures, setCombinedFeatures] = useState([]);
  const [show, setShow] = useState(false);

  const getRelatedProductInfo = () => {
    let relatedProdInfoArr = [];
    relatedProductIds.map((item) => {
      let tempObj = {};
      let urls = [
        '/proxy/api/fec2/hratx/products/' + item.toString(),
        '/proxy/api/fec2/hratx/products/' + item.toString() + '/styles',
        '/proxy/api/fec2/hratx/reviews/meta?product_id=' + item.toString()
      ];
      Promise.all(
        urls.map((url) => {
          return axios.get(url).then((res) => res.data);
        })
      )
        .then((data) => {
          tempObj.info = data[0];
          if (data[1].results[0].photos[0].thumbnail_url) {
            tempObj.thumbnail = data[1].results[0].photos[0].thumbnail_url;
          }
          if (data[2].ratings) {
            tempObj.rating = ratingCalculations(data[2].ratings);
          }
        })
        .then(() => {
          relatedProdInfoArr.push(tempObj);
          if (relatedProdInfoArr.length === relatedProductIds.length) {
            setRelatedProductInfo(relatedProdInfoArr);
          }
        })
        .catch((error) => {
          console.error(
            error,
            'OOOPS!  There was an error getting the information about related product.'
          );
        });
    });
  };

  const updateSelectedProduct = (product) => {
    // selectedProduct features + curProduct features
    let tempFeatures = Array.from(
      new Set(
        product.info.features.map((i) => i.feature).concat(curProduct.features.map((i) => i.feature))
      )
    );
    setSelectedProduct(product);
    setShow(true);
    setCombinedFeatures(tempFeatures);
    // console.log(relatedProductInfo);
  };

  useEffect(() => {
    let url = `/proxy/api/fec2/hratx/products/${curProduct.id}/related`;
    axios
      .get(url)
      .then((results) => {
        setRelatedProductIds(results.data);
      })
      .catch((error) => {
        console.error(
          error,
          'OOOPS!  There was an error getting the list of items related to this one.'
        );
      });
  }, [curProduct]);

  useEffect(() => {
    getRelatedProductInfo();
  }, [relatedProductIds]);

  return (
    <>
      <strong className='c-related-and-outfit'>RELATED ITEMS</strong>
      <div style={{ height: '530px', overflow: 'hidden' }}>
        <CarouselProvider
          className='c-related-items-carousel'
          naturalSlideHeight={500}
          naturalSlideWidth={406}
          totalSlides={relatedProductInfo.length}
          visibleSlides={3}
          dragEnabled={true}
          infinite={true}
        >
            <Slider aria-label='related products carousel' className='c-slider'>
            {relatedProductInfo.map(
              (product) =>
                product.thumbnail && (
                  <Slide
                    aria-label='product slide'
                    key={product.info.id}
                    style={{
                      height: '400px',
                      width: '406px',
                      position: 'relative',
                      marginRight: '20px'
                    }}
                    index={0}
                  >
                    <div
                      style={{
                        height: '400px',
                        width: '406px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        // width: '95%'
                      }}
                    >
                      <p
                        style={{
                          fontSize: '30px',
                          zIndex: '2',
                          position: 'absolute',
                          cursor: 'pointer',
                          marginLeft: '10px',
                          marginTop: '10px'
                        }}
                        onClick={() => {
                          setShow(true);
                          updateSelectedProduct(product);
                        }}
                      >
                        <i className="far fa-clone compare"></i>
                      </p>
                      <div
                        style={{
                          height: '70%',
                          width: '100%',
                          position: 'absolute'
                        }}
                      >
                        <div
                          onClick={() => {
                            getSingleProduct(product.info.id);
                          }}
                          style={{
                            height: '400px',
                            width: '406px',
                            backgroundImage: product.thumbnail
                              ? `url(${
                                  product.thumbnail.split('&w=')[0] + '&w=406&h=400&crop=faces'
                                })`
                              : null,
                            backgroundRepeat: 'no-repeat'
                          }}
                        ></div>
                        <div style={{ height: '30%', width: '100%' }}>
                        <div>
                            <StarRatings
                                rating={product.rating.ratingAverage || 0}
                                starRatedColor='#394a6d'
                                numberOfStars={5}
                                className='relatedRatingStars'
                                starDimension='18px'
                              />
                          </div>
                          <div className='fs-6 m-0 prodCategory'>
                            <span className='relatedItemName'>{product.info.name}</span>
                          </div>
                          <div className='fs-6 m-0'>${product.info.default_price}</div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                )
            )}
          </Slider>
          <ButtonBack className='buttonBack'>
              <span>
                <i class="fas fa-angle-left fa-2x"></i>
              </span>
            </ButtonBack>
            <ButtonNext className='buttonNext'>
              <span>
                <i class="fas fa-angle-right fa-2x"></i>
              </span>
            </ButtonNext>
        </CarouselProvider>
        <Modal
          className='c-modal'
          size='lg'
          show={show}
          onHide={() => setShow(false)}>
          <Modal.Header >
            <Modal.Title fontSize='24px'>Choices, choices....</Modal.Title>
            <Button
              variant="outline-dark"
              onClick={() => {setShow(false)}}
              className='c-modal-closeButton'>
              <i class="fas fa-times"></i>
            </Button>
          </Modal.Header>
          <Modal.Body>
            <table className='c-modal-table'>
              <tbody >
                <tr>
                  <th className='c-modal-th c-modal-thl'>{selectedProduct && selectedProduct.info.name}</th>
                  <th className='c-modal-th c-modal-thc'>vs.</th>
                  <th className='c-modal-th c-modal-thr'>{curProduct.name}</th>
                </tr>
                {combinedFeatures.map((feat) => {
                  let theValueL = '--';
                  let theValueR = '--';
                  selectedProduct.info.features.find((i) => {
                    if (i.feature === feat) {
                      theValueL = i.value;
                    }
                  });
                  curProduct.features.find((i) => {
                    if (i.feature === feat) {
                      theValueR = i.value;
                    }
                  });
                  return (
                    <tr className='c-modal-tr'>
                      <td className='c-modal-tdl'>{theValueL}</td>
                      <td className='c-modal-tdc'>{feat}</td>
                      <td className='c-modal-tdr'>{theValueR}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
