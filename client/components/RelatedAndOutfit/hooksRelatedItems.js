import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
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
        '/proxy/api/fec2/hratx/products/' + item.toString() + '/styles'
      ];
      Promise.all(
        urls.map((url) => {
          return axios.get(url).then((res) => res.data);
        })
      )
        .then((data) => {
          tempObj = data[0];
          if (data[1].results[0].photos[0].thumbnail_url) {
            tempObj.thumbnail = data[1].results[0].photos[0].thumbnail_url;
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
        product.features.map((i) => i.feature).concat(curProduct.features.map((i) => i.feature))
      )
    );
    setSelectedProduct(product);
    setShow(true);
    setCombinedFeatures(tempFeatures);
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
      <div className='border' style={{ height: '700px', overflow: 'hidden' }}>
        <CarouselProvider
          className='c-related-items-carousel'
          naturalSlideHeight={300}
          naturalSlideWidth={300}
          totalSlides={relatedProductInfo.length}
          visibleSlides={3}
          dragEnabled={false}
          infinite={true}
        >
            <Slider aria-label='related products carousel' className='c-slider'>
            {relatedProductInfo.map(
              (product) =>
                product.thumbnail && (
                  <Slide
                    aria-label='product slide'
                    key={Math.random()}
                    style={{
                      height: '300px',
                      width: '300px',
                      position: 'relative'
                    }}
                    index={0}
                  >
                    <div
                      style={{
                        height: '300px',
                        width: '300px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        // width: '95%'
                      }}
                    >
                      <p
                        style={{
                          fontSize: '25px',
                          zIndex: '2',
                          position: 'absolute',
                          cursor: 'pointer',
                          marginLeft: '5px'
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
                            getSingleProduct(product.id);
                          }}
                          style={{
                            height: '400px',
                            width: '400px',
                            backgroundImage: product.thumbnail
                              ? `url(${
                                  product.thumbnail.split('&w=')[0] + '&w=400&h=400&crop=faces'
                                })`
                              : null,
                            backgroundRepeat: 'no-repeat'
                          }}
                        ></div>
                        <div style={{ height: '30%', width: '100%' }}>
                          <div className='fs-6 m-0'>{product.category}</div>
                          <div className='fs-6 m-0'>{product.name}</div>
                          <div className='fs-6 m-0'>${product.default_price}</div>
                          <div className='fs-6 m-0'>
                            <StarRatings
                              rating={3.8}
                              starRatedColor='#394a6d'
                              numberOfStars={5}
                              name='rating'
                              starDimension='20px'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                )
            )}
          </Slider>
          <ButtonBack className='buttonBack'>
              <span>
                <i class="fas fa-angle-left"></i>
              </span>
            </ButtonBack>
            <ButtonNext className='buttonNext'>
              <span>
                <i class="fas fa-angle-right"></i>
              </span>
            </ButtonNext>
        </CarouselProvider>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Choices, choices....</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <tbody>
                <tr>
                  <th>{selectedProduct && selectedProduct.name}</th>
                  <th>vs.</th>
                  <th>{curProduct.name}</th>
                </tr>
                {combinedFeatures.map((feat) => {
                  let theValueL = '';
                  let theValueR = '';
                  selectedProduct.features.find((i) => {
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
                    <tr>
                      <td>{theValueL}</td>
                      <td>{feat}</td>
                      <td>{theValueR}</td>
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
