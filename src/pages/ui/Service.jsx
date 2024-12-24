import React from 'react';
import '../styles/Service.css';
import image1 from "../../assets/images/service 2.png"; // Assuming there's a third image for consistency
import image2 from "../../assets/images/service 1.png";
import image3 from "../../assets/images/service 3.png";

const services = [
  {
    icon: image1,
    title: 'FREE AND FAST DELIVERY',
    description: 'Free delivery for all orders over Rs 86K'
  },
  {
    icon: image2,
    title: '24/7 CUSTOMER SERVICE',
    description: 'Friendly 24/7 customer support'
  },
  {
    icon: image3,
    title: 'MONEY BACK GUARANTEE',
    description: 'We return money within 30 days'
  }
];

const Service = ({ icon, title, description }) => (
  <div className="service">
    <div className="icon-circle">
      <img src={icon} alt="Service Icon" />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Services = () => (
  <div className="services">
    {services.map((service, index) => (
      <Service key={index} {...service} />
    ))}
  </div>
);

export default Services;