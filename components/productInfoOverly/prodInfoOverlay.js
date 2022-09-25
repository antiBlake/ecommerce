import React, { useEffect, useState } from "react";
import {
  CartButtons,
  ProductInfoSection,
  VendorProduct,
  VendorProductsWrapper,
  Wrapper,
} from "./prodInfoOverlay.styles";
import { sanityClient, urlFor } from "../../lib/sanity";
import { formatCurrency } from "../../utils/currencyFormatter";
import { CloseMenu } from "./prodInfoOverlay.styles";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
} from "@mui/material";
import {
  AddRounded,
  ExpandMoreRounded,
  RemoveRounded,
} from "@material-ui/icons";

const ProductInfoOverlay = ({ currentProduct, setCurrentProduct }) => {
  console.log(currentProduct, "this is me");

  const [moreVendorProudcts, setMoreVendorProducts] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(0);

  const increment = () => {
    setItemQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (itemQuantity === 0) return;
    setItemQuantity((prev) => prev - 1);
  };
  useEffect(() => {
    async function getMoreFromVendor() {
      const vendor = currentProduct.vendor.title;
      const response = await sanityClient.fetch(
        `*[_type == 'product' && vendor->{title}.title == $vendor]{
          
  
   defaultProductVariant,
  _id,
  title,
  vendor->{
  title,
  logo
}
}
        `,
        { vendor }
      );
      const Products = response.filter(
        (product) => product._id != currentProduct._id
      );
      setMoreVendorProducts(Products);
      console.log(Products);
    }

    getMoreFromVendor();
  }, [currentProduct]);
  console.log(
    moreVendorProudcts.filter((product) => product._id != currentProduct._id),
    "this c must be love on the brain"
  );
  return (
    <>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "tween",
        }}
        exit={{ y: "100vh" }}
      >
        <motion.img
          id="productImage"
          src={urlFor(currentProduct.defaultProductVariant.images[0])}
          alt="Product Image"
          style={{ width: "100%" }}
        />
        <ProductInfoSection>
          <CloseMenu
            onClick={() => {
              setCurrentProduct(null);
            }}
          >
            <img src="close.svg" alt="close button" />
          </CloseMenu>
          <h4>{currentProduct.title}</h4>
          <h1>{formatCurrency(currentProduct.defaultProductVariant.price)}</h1>
          <CartButtons>
            <div id="quantity-control-container">
              <button
                className="quantity-change-buttons"
                onClick={() => {
                  increment();
                }}
              >
                {<AddRounded />}
              </button>
              <div id="quantity">{itemQuantity}</div>
              <button
                className="quantity-change-buttons"
                onClick={() => {
                  decrement();
                }}
              >
                {<RemoveRounded />}
              </button>
            </div>
            <button id="add-to-cart">
              <h1></h1>Add to cart
            </button>
          </CartButtons>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <h3>Product Description</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <h3>Size Guide</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <h3>Shipping Info</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </AccordionDetails>
          </Accordion>
          <h2 style={{ marginTop: "50px" }}>More from this vendor</h2>
          <VendorProductsWrapper>
            {moreVendorProudcts?.map((product) => (
              <VendorProduct>
                <img
                  key={product._id}
                  src={urlFor(product.defaultProductVariant.images[0])}
                  alt="Product Image"
                  onClick={() => {
                    setCurrentProduct(product);
                  }}
                />
                <div style={{ padding: "0 0.5rem" }}>
                  <h2>{formatCurrency(product.defaultProductVariant.price)}</h2>
                  <p>{product.title}</p>
                </div>
              </VendorProduct>
            ))}
            {moreVendorProudcts.length === 0 ? (
              <p>No more proudcts from this vendor</p>
            ) : null}
          </VendorProductsWrapper>
        </ProductInfoSection>
      </Wrapper>
    </>
  );
};

export default ProductInfoOverlay;
