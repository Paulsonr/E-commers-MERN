import React,{useEffect, useState} from 'react'
import axios from "axios";
const env_var = process.env.REACT_APP_ENV_VAR;
const product_module = process.env.REACT_APP_PRODUCT_ROUTE;

function Products () {
  const [appTitle, setAppTitle] = useState("");
  const productModuleURL = `${env_var}${product_module}`;
  useEffect(() => {
    axios
      .get(productModuleURL)
      .then((response) => setAppTitle(JSON.stringify(response.data)));
  }, []);
  return (
    <div>Products</div>
  )
}

export default Products