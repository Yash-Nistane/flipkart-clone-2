import React, { useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";
import { BiRupee } from "react-icons/bi";

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
  

    const [qty, setQty] = useState(props.cartItem.qty);

    const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
     setQty(qty + 1);
     props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
     if (qty <= 1) return;
     setQty(qty - 1);
     props.onQuantityDec(_id, qty - 1);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow" style={{marginBottom:"15px"}}>
        <div className="cartProImgContainer">
          {/* <img src={generatePublicUrl(img)} alt={""} /> */}
          <img src={img} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p className="price"><span style={{paddingTop:"3px"}}><BiRupee/></span> {price}</p>
          </div>
          <div style={{marginRight:"20px"}}>
             Delivery in 3 - 5 days
          </div>
          
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button  onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button  onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;