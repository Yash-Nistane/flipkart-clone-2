import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { generatePublicUrl } from "../../urlConfig";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import "./style.css";
import { Breed } from "../../components/MaterialUI";

/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);

  return (
    <Layout>
      <div style={{ maxWidth: "90%", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "" },
            { name: "My Orders", href: "" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ margin: "10px 0" }}>
              <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
                style={{ textDecoration: "none", color:"#333" }}
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">
                    <BiRupee />
                    {item.payablePrice}
                  </div>
                  {/* <div>{order.paymentStatus}</div> */}
                </div>

                {/* {OrderSummary Graph} */}

                <div className="orderTrack">
                  {order.orderStatus.map((status) => (
                    <div
                      className={`orderStatus ${
                        status.isCompleted ? "active" : ""
                      }`}
                    >
                      <div
                        className={`point ${
                          status.isCompleted ? "active" : ""
                        }`}
                      ></div>
                      <div className="orderInfo">
                        <div className="status">{status.type}</div>
                        <div className="date">{formatDate(status.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
