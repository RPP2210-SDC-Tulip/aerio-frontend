import React, { useState, useEffect } from 'react';

const ProductGallery = ( { productPhotos, productName, styleName } ) => {

  const [mainImage, setMainImage] = useState('');
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Current bug -- this takes a noticeable amount of time to render to the page on initial page load
  useEffect(() => {
    setMainImage(productPhotos[0].url);
  }, [productPhotos]);

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    let thumbnail_index = e.target.id;
    setMainImage(productPhotos[thumbnail_index].url);
    setMainImageIndex(thumbnail_index);
  }

  const imageDescription = productName.concat(', ', styleName);

  let count = -1;

  const thunbnailList = productPhotos.map(photo => {
    count++;
    let thumbnailDescription = imageDescription.concat(' Image #', count);
    if (photo.url === mainImage) {
      return (
        <img className="selected_gallery_thumbnail" key={count} id={count} data-testid={`galleryThumbnailImage${count}`} src={photo.thumbnail_url} alt={thumbnailDescription} width="100px" onClick={handleThumbnailClick}></img>
      );
    } else {
      return (
        <img className="gallery_thumbnail" key={count} id={count} data-testid={`galleryThumbnailImage${count}`} src={photo.thumbnail_url} alt={thumbnailDescription} width="100px" onClick={handleThumbnailClick}></img>
      );
    }
  });

  const handleMainPreviousClick = (e) => {
    e.preventDefault();
    setMainImage(productPhotos[mainImageIndex - 1].url);
    setMainImageIndex(mainImageIndex - 1);
  }

  const handleMainNextClick = (e) => {
    e.preventDefault();
    setMainImage(productPhotos[mainImageIndex + 1].url);
    setMainImageIndex(mainImageIndex + 1);
  }

  return (
    <div className="gallery">
      {/* <h2>This is the Product Gallery Component!</h2> */}
      {mainImageIndex > 0 ? <button className="main_image_previous" onClick={handleMainPreviousClick}>Previous!!!</button> : null}
      {mainImageIndex < thunbnailList.length - 1 ? <button className="main_image_next" onClick={handleMainNextClick}>Next!!!</button> : null}
      <img className="mainImage" data-testid="mainImage" src={mainImage} alt={imageDescription}></img>
      <div className="thumbnailGallery">
        <button className="thumbnail_gallery_previous">Up!!!</button>
        <div className="thumbnailCarousel">{thunbnailList}</div>
        <button className="thumbnail_gallery_next">Down!!!</button>
      </div>
    </div>
  )
}

export default ProductGallery;
