import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { generatePublicUrl } from "../../../urlConfig";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";


/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {

    const product = useSelector((state) => state.product);
    const [priceRange, setPriceRange] = useState({
      under5k:5000,
      under10k:10000,
      under15k:15000,
      under20k:20000,
      under30k:30000
    });
    const dispatch = useDispatch();

    const generateRating = () => {
      const random = (3.3 + (Math.random() * 1)).toFixed(1);
      return random;
    }
  
    useEffect(() => {
      const { match } = props;
      dispatch(getProductBySlug(match.params.slug));
    }, []);



  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft = {`${props.match.params.slug} mobiles under ₹ ${priceRange[key]}`}
            headerRight = {<button className="view-btn">VIEW ALL</button>}
            style = {{
              width: 'calc(100% - 40px)',
              margin:'20px'
            }}
            styleLeft={{
              fontSize:"20px"
            }}
          >
          
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                   to = {`/${product.slug}/${product._id}/p`}
                   style = {{
                     display: "block",
                     textDecoration:"none",
                                                              
                   }}
                   className="productContainer"
                >
                  <div className="productImgContainer" style={{margin:"20px auto"}}>

                  <img
                      src={product.productPictures[0].img}
                      alt="pic"
                    />
                    {/* <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt="pic"
                    /> */}
                    {/* <img src = "http://localhost:2000/public/ttDFTf0KX0-galaxy-m42-galaxy-m42-samsung-original-imag3hz5gndhffxn.jpeg" /> */}
                  </div>

                  <div className="productInfo" style={{marginBottom : "25px"}}>
                    <div className="productName" style={{ margin: "5px 0",color:"black",fontSize:"larger" }}>{product.name}</div>
                    <div style={{marginTop:"8px"}}>
                      <span className="ratingCount">{generateRating()} <IoIosStar /></span>&nbsp;
                      <span className="productRating">(3353)</span>
                      <span className="productPrice"><BiRupee /> {product.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ProductStore;
