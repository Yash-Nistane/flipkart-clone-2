import React, { useEffect }from "react";
import Layout from "../../components/Layout";
import "./style.css";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage";
import ProductDefault from "./ProductDefault";
import ClothingAndAccessories from "./ClothingAndAccessories";
import getParams from "../../utils/getParams";
import { BiRadioCircleMarked } from "react-icons/bi";


/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {

  const renderProduct = () => {
    //console.log(props);
    const params = getParams(props.location.search);
    //console.log(params);

    let content = null;
    switch(params.type){
      case 'store':
        content = <ProductStore {...props}/>
        break;
      case  'page':
        content = <ProductPage {...props}/>
        break;
      case "product":
        content = <ClothingAndAccessories {...props}/>;
        break;
      default:
        content=<ProductDefault {...props}/>;
        

    }

    return content;
  }

  

  return (
    <Layout>
      {renderProduct()}
    </Layout>
  );
};

export default ProductListPage;
