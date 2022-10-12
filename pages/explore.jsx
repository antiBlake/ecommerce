import React, { useState } from 'react'
import ExplorePage from '../components/Explore/explorePage'
import { useEffect } from 'react';
import algoliasearch from "algoliasearch";
import { NavBar } from '../components/Explore/explorePage.styles';
import { Button } from '@mui/material';
import { FilterListRounded } from '@material-ui/icons';


const Explore = () => {
     const searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_SEARCH_KEY
    );
    const index = searchClient.initIndex('dev_ecommerce')
  const [searchQuery, setSearchQuery] = useState('')
  console.log(searchQuery)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
        let ignore = false
    async function getalgo() {
      if (!ignore && searchQuery != '') {        
        const res = await index.search(searchQuery, {});
        setSearchResults(res)
        console.log(res);
      }
    }
    getalgo();
    return ()  =>{ ignore = true}
  }, [searchQuery]);
  return (
    <>
      <NavBar>
                <div id = 'search-tools'>

          <input placeholder='Search for something...' type='search' onChange={(e) => { setSearchQuery(e.target.value) }} value={searchQuery} />  
                    <Button style={{borderRadius: '50%'}}>

            <FilterListRounded style={{color: 'black'}} />
                    </Button>
                </div>
                <div id = 'search-tags'>
                    <div className='search-tag'>Shirts</div>
                    <div className='search-tag'>Shoes</div>
                    <div className='search-tag'>Bottoms</div>
                    <div className='search-tag'>Pyjamas</div>
                </div>
            </NavBar>
      <ExplorePage  searchResults = {searchResults} />
       </>
        )
}


export default Explore