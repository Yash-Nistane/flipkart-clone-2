import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems,  removeCartItem  } from "../../actions";
import PriceDetails from "../../components/PriceDetails";
import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";

/**
 * @author
 * @function CartPage
 **/

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  //const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const dispatch = useDispatch();

  const onOrderPlace=() => {


    
    console.log(noOfCartItems);
    if(noOfCartItems){
      props.history.push(`/checkout`)
    }
    else{
       alert("Cart is empty!");
    }
  }

  useState (()=> {
    const result = Object.keys(cart.cartItems).length;
    setNoOfCartItems(result);
  },[]);

  useEffect(() => {

    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
     dispatch(removeCartItem({ productId: _id }));
  };


  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }


  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={"My Cart"}
          headerRight={<div>Deliver to</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
            />
          ))}

          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
                //onClick={() => props.history.push(`/checkout`)}
                onClick = {onOrderPlace}
                
              />
            </div>
          </div>
        </Card>

        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {

            qty = qty + cart.cartItems[key].qty;
            return qty;

            //return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
        {/* <Card
          headerLeft="price"
          style={{
            width: "380px",
          }}
        ></Card> */}
      </div>
    </Layout>  
  );
};

export default CartPage;
