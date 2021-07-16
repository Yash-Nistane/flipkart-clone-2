import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getProductDetailsById,
  addReview,
} from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt, AiFillTags, AiFillStar } from "react-icons/ai";
import { FaTags } from "react-icons/fa";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { addToCart } from "../../actions";
import Rating from "../../components/UI/Rating";

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const [imageNo, setImageNo] = useState(0);
  const [noOfStars, setNoOfStars] = useState(3);
  const [productReview, setProductReview] = useState("");

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const changeImage = (index) => {
    setImageNo(index);
  };

  const submitReview = () => {
    const payload = {
      productId: product.productDetails._id,
      review: productReview,
      rating: noOfStars,
    };

    dispatch(addReview(payload));
  };

  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, [product.productDetails.reviews]);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div
                onMouseOver={() => changeImage(index)}
                className={imageNo == index ? "thumbnail active" : "thumbnail"}
              >
                {/* <img src={generatePublicUrl(thumb.img)} alt={thumb.img} /> */}
                <img src={thumb.img} />
              </div>
            ))}
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              {/* <img
                src={generatePublicUrl(
                  product.productDetails.productPictures[imageNo].img
                )}
                alt={`${product.productDetails.productPictures[0].img}`}
              /> */}

              <img
                src={product.productDetails.productPictures[imageNo].img}
                alt={`${product.productDetails.productPictures[0].img}`}
              />
            </div>

            {/* action buttons */}
            <div className="flexRow" style={{ marginTop: "15px" }}>
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  props.history.push(`/cart`);
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  props.history.push(`/checkout`);
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "40px" }}>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="/">Home</a>
                <IoIosArrowForward />
              </li>
              {/* <li>
                <a href="">Mobiles</a>
                <IoIosArrowForward />
              </li> */}
              <li>
                <a href="">{product.productDetails.category.name}</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.3
                <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiRupee />
              250 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="priceProduct">
                <BiRupee />
                {product.productDetails.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <div className="offersContainer">
                <span className="offers">
                  <span className="offerTag">
                    <FaTags />
                  </span>
                  <span style={{ fontWeight: "500" }}>Bank Offer</span> 20% off
                  on 1st txn with Amex Network Cards issued by ICICI
                  Bank,IndusInd Bank,SBI Cards and Mobikwik{" "}
                  <span className="terms">T&C</span>
                </span>
                <span className="offers">
                  <span className="offerTag">
                    <FaTags />
                  </span>
                  <span style={{ fontWeight: "500" }}>Bank Offer</span> 10% Off
                  on Bank of Baroda Mastercard debit card first time
                  transaction, Terms and Condition apply{" "}
                  <span className="terms">T&C</span>
                </span>
                <span className="offers">
                  <span className="offerTag">
                    <FaTags />
                  </span>
                  <span style={{ fontWeight: "500" }}>Bank Offer</span> 10% Off
                  on First time ICICI Mastercard Credit Card transaction, Terms
                  and Condition apply <span className="terms">T&C</span>
                </span>
                <span className="offers">
                  <span className="offerTag">
                    <FaTags />
                  </span>
                  Get Google Nest mini at just ₹1999 on purchase of select
                  Smartphones, TVs, Laptops, TV streaming{" "}
                  <span className="terms">T&C</span>
                </span>
              </div>
              <div style={{ display: "flex", marginTop: "15px" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "14px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#212121",
                    lineHeight: "1.5rem",
                    width: "fit-content",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </div>
            </div>
          </div>

          <div className="reviewSection">
            <div className="ratingsAndReview">
              <div style={{ fontWeight: "500" }}>Ratings & Reviews</div>
              <div
                style={{ color: "grey", fontSize: "13px", fontWeight: "500" }}
              >
                <Rating value="4.3" /> 72,234 Ratings & 8,140 Reviews
              </div>
              <div style={{ marginLeft: "auto", marginRight: "100px" }}>
                <button onClick={submitReview} className="addReviewBtn">
                  Rate Product
                </button>
              </div>
            </div>

            <div>
              <div>
                <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Rate this product
                </div>
                <div style={{ display: "flex" }}>
                  <span
                    onClick={() => setNoOfStars(1)}
                    className={noOfStars > 0 ? "star rated" : "star"}
                  >
                    <AiFillStar />
                  </span>
                  <span
                    onClick={() => setNoOfStars(2)}
                    className={noOfStars > 1 ? "star rated" : "star"}
                  >
                    <AiFillStar />
                  </span>
                  <span
                    onClick={() => setNoOfStars(3)}
                    className={noOfStars > 2 ? "star rated" : "star"}
                  >
                    <AiFillStar />
                  </span>
                  <span
                    onClick={() => setNoOfStars(4)}
                    className={noOfStars > 3 ? "star rated" : "star"}
                  >
                    <AiFillStar />
                  </span>
                  <span
                    onClick={() => setNoOfStars(5)}
                    className={noOfStars > 4 ? "star rated" : "star"}
                  >
                    <AiFillStar />
                  </span>
                </div>
              </div>

              <div style={{ fontSize: "16px", marginBottom: "15px" }}>
                <div>Review this product</div>
                <div>
                  <textarea
                    type="text"
                    placeholder="Description..."
                    className="reviewInput"
                    onChange={(e) => setProductReview(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="reviews">
              <div>
                {product.productDetails.reviews.map((data, index) => (
                  <div style={{ margin: "0 15px" }}>
                    <div
                      style={{
                        padding: "20px 0 30px 0",
                        borderBottom: "0.5px solid lightgrey",
                      }}
                    >
                      <div>
                        <div style={{ marginBottom: "15px", fontSize: "14px" }}>
                          <Rating value={data.rating} />{" "}
                          {`${data.userId.firstName} ${data.userId.lastName}`}
                        </div>
                        <div style={{ padding: "0 15px", fontSize: "14px" }}>
                          {data.review}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
