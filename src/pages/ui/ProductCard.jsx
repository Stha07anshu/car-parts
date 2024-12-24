import React from 'react';
import '../styles/ProductCard.css'; // Import the CSS for styling

const ProductCard = () => {
  return (
    <div className="container d-flex justify-content-center">
      <figure className="card card-product-grid card-lg">
        <a href="#" className="img-wrap" data-abc="true">
          <img src="https://i.imgur.com/MPqUt62.jpg" alt="Product" />
        </a>
        <figcaption className="info-wrap">
          <div className="row">
            <div className="col-md-9 col-xs-9">
              <a href="#" className="title" data-abc="true">
                Name
              </a>
              <span className="rated">Category</span>
            </div>
            <div className="col-md-3 col-xs-3">
              <div className="rating text-right">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <span className="rated">Rated 4.0/5</span>
              </div>
            </div>
          </div>
        </figcaption>

        <div className="bottom-wrap-payment">
          <figcaption className="info-wrap">
            <div className="row">
              <div className="col-md-9 col-xs-9">
                <a href="#" className="title" data-abc="true">
                  {/* Price moved to right */}
                </a>
                <span className="rated">Price</span>
              </div>
              <div className="col-md-3 col-xs-3 text-right">
                <a href="#" className="title" data-abc="true">
                  Nrs 10
                </a>
              </div>
            </div>
          </figcaption>
        </div>

        <div className="bottom-wrap">
          <a href="#" className="btn btn-primary float-right" data-abc="true">
            Buy now
          </a>
        </div>
      </figure>
    </div>
  );
};

export default ProductCard;
