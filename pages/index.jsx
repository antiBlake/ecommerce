import React, { useRef } from "react";
import { useState } from "react";
import { sanityClient, urlFor } from "../lib/sanity";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend/use-user";
import { useEffect } from "react";
import ProductInfoOverlay from "../components/productInfoOverly/prodInfoOverlay";
import { AnimatePresence, motion } from "framer-motion";

const productQuery = `*[_type == 'product'] | order(_id)[0...3]{
  defaultProductVariant,
  _id,
  title,
  vendor->{
  title,
  logo
}
}`;

const Wrapper = styled.div`
 overflow-Y: scroll; 
 height: 100%; 
 ::-webkit-scrollbar{
  display: none
 }
 -ms-overflow-style: none;
 scrollbar-width: none;


`
const ProductInfo = styled.div`
margin-bottom: 40px;
width: 100%;




#productImage{
 width: 100%;
}

#vendorImage{
  width: 50px;
  margin-right: 20px;
}

#action-section{
  display:flex;
}

.action-button{
  margin-right: 10px;
}
`;
const Home = ({ results }) => {


  const { user, loading, error } = useUser()
  const [productData, setProductData] = useState(results)
  const [hasMore, setHasMore] = useState(true)
  const lastId = useRef(results[results.length - 1]._id)
  const [currentProudct, setCurrentProduct] = useState(null)

  useEffect(() => {

    async function fetchData() {

      if (user) {
        const data = await fetch('/api/users/createUser', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const final = await data.json()
        console.log(final)
      }
    }
    fetchData()
  }, [user])


  async function fetchNextPage() {
    console.log("this function is called")
    const { current } = lastId
    if (current === null) {
      setHasMore(false)
    }
    const data = await sanityClient.fetch(`*[_type == "product" && _id > $current] | order(_id) [0...3] {
     defaultProductVariant,
  _id,
  title,
  vendor->{
  title,
  logo
}
    }`, { current })
    if (data.length > 0) {
      lastId.current = data[data.length - 1]._id
      setProductData(prev => [...prev, ...data])
      console.log("i did it")
    } else {
      lastId.current = null // Reached the end
      setHasMore(false)
    }
  }


  return (

    <>

      <Wrapper id="parent" >

        <InfiniteScroll
          dataLength={productData.length}
          next={fetchNextPage}
          hasMore={hasMore}
          loader={<CircularProgress style={{ marginBottom: '50px' }} />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget='parent'
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {productData.map((product) => (
            <ProductInfo key={product._id}>
              <div>
                <img id="vendorImage" src={urlFor(product.vendor.logo).url()} alt="" />

              </div>
              <motion.img  id='productImage' src={urlFor(product.defaultProductVariant.images[0])} alt="Product Image" onClick={() => { setCurrentProduct(product); }} whileTap={{ scale: 0.9 }} />

              <div>
                <div id='action-section'>
                  <img className="action-button" src='likeButton.svg' alt="" />
                  <img className="action-button" src='commentButton.svg' alt="" />
                </div>
                <h3>3000 likes</h3>
              </div>

            </ProductInfo>

          ))}
        </InfiniteScroll>
      </Wrapper>
      <AnimatePresence>

      {currentProudct &&


          <ProductInfoOverlay currentProduct={currentProudct} setCurrentProduct={setCurrentProduct} key={currentProudct._id} />}
      </AnimatePresence>
    </>

  );
};

export default Home;

export const getStaticProps = async () => {
  const results = await sanityClient.fetch(productQuery);

  return { props: { results } };
};
