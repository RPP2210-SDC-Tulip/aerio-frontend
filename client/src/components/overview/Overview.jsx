import React, { useState, useEffect } from 'react';
import ProductGallery from './ProductGallery.jsx';
import ProductSelected from './ProductSelected.jsx';
import ProductDetails from './ProductDetails.jsx';
import useInteraction from '../../useInteraction.jsx';
const axios = require('axios');

const Overview = ( { productId, styleId, averageStarRating, totalNumberReviews, productFeatures, myOutfit, setMyOutfit, setOutfitCards, setProductId, updateSelectedProduct, inOutfit, setInOutfit, reviewsRef } ) => {

  // Adding a comment to confirm this version of Aerio is running from Tulip's Organization

  const [productDetails, setProductDetails] = useState({id: null, name: '', slogan: '', description: '', category: '', default_price: '', features: []});
  const [productStyles, setProductStyles] = useState([{name: '', photos: [{thumbnail_url: '', url: ''}]}]);
  const [selectedStyle, setSelectedStyle] = useState({name: '', photos: [{thumbnail_url: '', url: ''}], skus: {null: {quantity: null, size: null}} });

  useEffect(() => {
    getProductDetails(productId);
    setProductStylesDetails(productId);
  }, [productId]);

  const getProductDetails = (product_id) => {
    axios.get(`/products/${product_id}`)
      .then(productDetailsData => {
        setProductDetails(productDetailsData.data);
      })
      .catch(error => {
        console.error('Error getting product details in Overview component');
      });
  };

  const setProductStylesDetails = (product_id) => {
    axios.get(`/products/${product_id}/styles`)
      .then(productStylesData => {
        setProductStyles(productStylesData.data.results);
        setSelectedStyle(productStylesData.data.results[0]);
      })
      .catch(error => {
        console.error('Error getting product styles in Overview component');
      });
  };

  const updateSelectedStyle = (e) => {
    e.preventDefault();
    setSelectedStyle(productStyles[e.target.id]);
  }

  return (
    <div id="overview" onClick={(e)=>useInteraction(e, 'Overview')}>
      <div id="overview_top">
        <ProductGallery productPhotos={selectedStyle.photos} productName={productDetails.name} styleName={selectedStyle.name}/>
        <ProductSelected productDetails={productDetails} selectedStyle={selectedStyle} productStyles={productStyles} averageStarRating={averageStarRating} totalNumberReviews={totalNumberReviews} updateSelectedStyle={updateSelectedStyle} myOutfit={myOutfit} setMyOutfit={setMyOutfit} setOutfitCards={setOutfitCards} setProductId={setProductId} updateSelectedProduct={updateSelectedProduct} inOutfit={inOutfit} setInOutfit={setInOutfit} reviewsRef={reviewsRef} />
      </div>
      {productDetails.features.length > 0 ? <ProductDetails slogan={productDetails.slogan} description={productDetails.description} features={productDetails.features}/> : null}
    </div>
  );
}

export default Overview;
