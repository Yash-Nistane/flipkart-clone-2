import React from "react";
import Layout from "../../components/Layout";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {
  return (
    <Layout>
      <Carousel>
        <div>
          <img src="https://assets.indiadesire.com/content/Flipkart%20BBD%20Mobile%20Offers.jpg" />
        </div>
        <div>
          <img src="https://images.freekaamaal.com/post_images/1617784369.webp" />
        </div>
        <div>
          <img src="https://www.karobargain.com/wp-content/uploads/2020/01/Flip-kart-_-banner-_-upcoming.jpg" />
        </div>
      </Carousel>
    </Layout>
  );
};

export default HomePage;
