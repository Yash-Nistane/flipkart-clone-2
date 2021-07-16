import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { generatePublicUrl } from "../../../urlConfig";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import Rating from "../../../components/UI/Rating";
import "./styleDefault.css";

/**
 * @author
 * @function PageDefault
 **/

const PageDefault = (props) => {
    
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    console.log(props);
    dispatch(getProductBySlug(match.params.slug));
  }, []);

  return (
    <div style={{ padding: "10px", width: "90%", margin: "auto" }}>
      <div
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          width: "75rem",
        }}
      >
        {product.products.map((product) => (
          <div
            className="dproductContainer"
            style={{
              padding: "5px 0",
              position: "relative",
              width: "290px",
              display: "flex",
              justifyContent: "center",
              margin: "5px 0",
              height: "370px",
              boxShadow: "rgba(0, 0, 0, 0.45) 12px 15px 15px -20px",
            }}
          >
            <Link
              className="dcaImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              {/* <img src={generatePublicUrl(product.productPictures[0].img)} /> */}
              <img src={product.productPictures[0].img} />
            </Link>

            <div style={{ position: "absolute", bottom: "10px", left: "15px" }}>
              <div className="dcaProductName">{product.name}</div>
              <div className="dcaProductPrice">
                ₹ {product.price} <Rating value="4.3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageDefault;
