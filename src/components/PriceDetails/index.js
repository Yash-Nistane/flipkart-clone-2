import React from "react";
import Card from "../UI/Card";
import { BiRupee } from "react-icons/bi";

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  return (
    <Card headerLeft={"PRICE DETAILS"} style={{ maxWidth: "380px",}} styleLeft={{color:"grey"}}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Price ({props.totalItem} items)</div>
          <div style={{display:"flex",alignItems:"center"}}><span style={{marginTop:"4px"}}><BiRupee/></span> {props.totalPrice}</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Delivery Charges</div>
          <div style={{color:"green"}}>FREE</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div><strong style={{fontWeight:"500"}}>Total Amount</strong></div>
          <div style={{display:"flex",alignItems:"center"}}><strong style={{display:"flex",alignItems:"center"}}><span style={{marginTop:"4px"}}><BiRupee/></span> {props.totalPrice}</strong></div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;