import React, { useState, useEffect } from "react";
import "../src/App.css";

const ImageSlider = () => {
  const [images, setImages] = useState([
    { id: 1, src: 'image1.jpg', title: 'Lemon Cane' },
    { id: 2, src: 'image2.jpg', title: 'Plain Cane' },
    { id: 3, src: 'image3.jpg', title: 'Ginger Cane' },
    { id: 4, src: 'image4.jpg', title: 'Lemon Ginger' },
    { id: 5, src: 'image5.jpg', title: 'Kokum Cane' },
    { id: 6, src: 'image6.jpg', title: 'Jal Jeera Cane' },
  ]);

  const [leftImages, setLeftImages] = useState(images);
  const [centerImage, setCenterImage] = useState(null);
  const [rightImages, setRightImages] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (leftImages.length > 0) {
        const imageToMove = leftImages[0];
        setLeftImages(leftImages.slice(1));
        setCenterImage(imageToMove);

        setTimeout(() => {
          setCenterImage(null);

          setTimeout(() => {
            setRightImages([...rightImages, imageToMove]);
          }, 200); 
        }, 3000); 
      } else {
        clearInterval(timer);
      }
    }, 4000); // Adjust this time to control the overall slideshow speed

    return () => clearInterval(timer);
  }, [leftImages, rightImages]);

  return (
    <div className="image-slider-app">
      <div className="image-column left-column">
        <h2>Left Side</h2>
        {leftImages.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={`/images/${image.src}`}
              alt={`Image ${index + 1}`}
              className="black-and-white"
              data-id={image.id}
            />
            <p>{image.title}</p>
          </div>
        ))}
      </div>
      <div className="image-column center-column">
        {centerImage && (
          <div className="image-container">
            <img
              className={`center-image`}
              src={`/images/${centerImage.src}`}
              alt={centerImage.title}
              data-id={centerImage.id}
            />
            <p>{centerImage.title}</p>
          </div>
        )}
      </div>
      <div className="image-column right-column">
        <h2>Right Side</h2>
        {rightImages.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={`/images/${image.src}`}
              alt={image.title}
              data-id={image.id}
            />
            <p>{image.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
