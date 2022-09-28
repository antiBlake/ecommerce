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
import { motion } from "framer-motion";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  AddRounded,
  ExpandMoreRounded,
  RemoveRounded,
} from "@material-ui/icons";
import { useShoppingCart } from "../../context/shoppingCart";

const ProductInfoOverlay = ({ currentProduct, setCurrentProduct }) => {
  const { modifyItemQuantity, getItemQuantity } = useShoppingCart();
  console.log(getItemQuantity(currentProduct._id)?.quantity);
  const cartButtonState = () => {
    if (getItemQuantity(currentProduct._id) == null) return "Add to cart";
    if (getItemQuantity(currentProduct._id) !== itemQuantity) {
      return "Update quantity";
    } else {
      return "In cart";
    }
  };

  const [moreVendorProudcts, setMoreVendorProducts] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(
    getItemQuantity(currentProduct._id) || 1
  );

  const increment = () => {
    setItemQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (itemQuantity === 1) return;
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

  return (
    <>
      <Wrapper
        initial={{ y: "100vh" }}
        animate={{ y: "0vh" }}
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
          <CartButtons primary>
            <div id="quantity-control-container">
              <button
                className="quantity-change-buttons"
                onClick={() => {
                  decrement();
                }}
              >
                {<RemoveRounded />}
              </button>
              <div id="quantity">{itemQuantity}</div>
              <button
                className="quantity-change-buttons"
                onClick={() => {
                  increment();
                }}
              >
                {<AddRounded />}
              </button>
            </div>
            <button
              id="add-to-cart"
              onClick={() => {
                if (cartButtonState() == "In cart") return;
                console.log("tis ran");
                modifyItemQuantity(currentProduct, itemQuantity);
              }}
            >
              {cartButtonState()}
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
              <VendorProduct key={product._id}>
                <img
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
