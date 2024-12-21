import React, { useState, useEffect } from "react";
import '../styles/Ads.css'; // Importing the CSS file
import image1 from "../../assets/images/ads1.png";
import image2 from "../../assets/images/ads2.png";
import image3 from "../../assets/images/ads3.png";

const Ads = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState(''); // State to manage fade-in class

  const adsData = [
    {
      title: "Enhance Your Music Experience with Sony Xplod",
      description: "Upgrade your car audio system and enjoy powerful sound quality.",
      image: image1, // Using the imported image
    },
    {
      title: "Revolutionize Your Drive with Android Car Screen",
      description: "Stay connected and entertained with a high-tech Android screen for your car.",
      image: image2, // Using the imported image
    },
    {
      title: "Experience Luxury with Exotic Perfume",
      description: "Indulge in the finest fragrances and elevate your style with luxury perfumes.",
      image: image3, // Using the imported image
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass(''); // Reset fade class before updating image
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adsData.length);
      setFadeClass('fade-in'); // Add fade-in effect after changing the ad
    }, 5000); // Switch ad every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="ad-container">
      <div className="ad-text">
        <h1>{adsData[currentAdIndex].title}</h1>
        <p>{adsData[currentAdIndex].description}</p>
      </div>
      <div className="ad-image">
        <img
          src={adsData[currentAdIndex].image} // Using the imported image
          alt="Ad"
          className={fadeClass} // Add fade-in class
        />
      </div>
    </div>
  );
};

export default Ads;
