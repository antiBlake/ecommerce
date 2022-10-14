import React from 'react'
import Home from '../components/Home/home'
import { sanityClient} from "../lib/sanity";

const productQuery = `*[_type == 'product'] | order(_id)[0...3]{
  defaultProductVariant,
  _id,
  title,
  slug,
  vendor->{
  title,
  logo,
  _id
}
}`;


const HomePage = ({results}) => {
  
  return (
    <Home results={results}/>
  )
}

export default HomePage;


export const getServerSideProps = async () => {
  const results = await sanityClient.fetch(productQuery);
  return { props: { results } };
};
