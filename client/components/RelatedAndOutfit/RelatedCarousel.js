import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

export const RelatedCarousel = (props) => {

  console.log(props);

  const [show, setShow] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional,default to 1.
    }
  };


  return (
    <div>
    <Carousel
      className="related-items-caro"
      style={{ height: '500px', overflow: 'hidden' }}
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      infinite={true}
      centerMode={false}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item-padding-40-px"
    >
        {props.relatedProductInfo.map(
          (product) =>
            product.thumbnail && (
              <div
                aria-label='product slide'
                key={Math.random()}
                style={{
                  borderStyle: 'solid',
                  height: '300px',
                  width: 'auto',
                  marginLeft: '7px',
                  marginRight: '7px',
                }}
                index={0}
              >
                <div
                  style={{
                    height: '400px',
                    width: '280px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '95%'
                  }}
                >
                  <p
                    style={{
                      color: 'yellow',
                      fontSize: '25px',
                      textAlign: 'right',
                      zIndex: '100',
                      position: 'absolute'
                    }}
                    onClick={() => {
                      setShow(true);
                      updateSelectedProduct(product);
                    }}
                  >
                    &#9733;
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
                        height: '300px',
                        width: '300px',
                        backgroundImage: product.thumbnail
                          ? `url(${
                              product.thumbnail.split('&w=')[0] + '&w=300&h=300&crop=faces'
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
              </div>
            )
        )}
    </Carousel>
    <Modal
      show={show}
      onHide={() => setShow(false)}>
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
  );
};

