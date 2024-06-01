import React, { useEffect, useState } from "react";
import axios from "axios";
//mui
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
//
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../Shared/Store/actions/products.action";
import "./style/products.scss";

const env_var = process.env.REACT_APP_ENV_VAR;
const product_module = process.env.REACT_APP_PRODUCT_ROUTE;

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const [appTitle, setAppTitle] = useState("");
  const productModuleURL = `${env_var}${product_module}`;

  const handleProductClick = (productDetails) => {
    navigate(`/products/${productDetails._id}`);
  };

  useEffect(() => {
    axios.get(productModuleURL).then((res) => {
      dispatch(setProducts(res.data));
    });
  }, []);
  return (
    <>
      {" "}
      {!products ? (
        <div>Loading...</div>
      ) : (
        <div className="products_container">
          {products.map((product) => (
            <Card className="product_card">
              <CardActionArea onClick={() => handleProductClick(product)}>
                <CardMedia
                  component="img"
                  height="150"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default Products;
