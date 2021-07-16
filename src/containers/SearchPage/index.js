import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "./../../components/Layout";
import ClothingAndAccessories from "./ClothingAndAccessories";
import ProductStore from "./ProductStore";


/**
 * @author
 * @function SearchPage
 **/

const SearchPage = (props) => {
  const product = useSelector((state) => state.product);
  const { searchCategory } = product;

  const didMountRef = useRef(false);


  const renderProduct = () => {
    //console.log(props);

    //console.log(params);

    let content = null;
    switch (searchCategory.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
        // case  'page':
        //   content = <ProductPage {...props}/>
        //   break;
       case "product":
          content = <ClothingAndAccessories {...props}/>;
          break;
      //  default:
      //     content=<ProductDefault {...props}/>;

    }
    return content;
  };

  
  //console.log("good mrng", searchCategory.slug);

  useEffect(() => {
    if (didMountRef.current) {
      //console.log("good", searchCategory.slug);
       
    } else didMountRef.current = true;
  }, [searchCategory]);

  return <Layout>{renderProduct()}</Layout>;
};

export default SearchPage;
